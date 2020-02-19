import { Injectable } from '@angular/core';
import { LoggingRequestData } from './remote-log.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { readableKey } from '../utils/string';

interface SlackField {
	type?: 'text' | 'mrkdwn' | string;
	text?: string;
	fields?: SlackField[];
}

interface SlackBlock {
	type?: 'section' | string;
	text?: SlackField;
	fields?: SlackField;
}

interface SlackMessageBody {
	text?: 'section' | 'divider';
	blocks?: SlackBlock[];
	thread_ts?: string;
	/**
	 * @deprecated
	 */
	attachments?: any[];
	mrkdwn?: boolean;
}

interface SlackErrorPayload extends LoggingRequestData {
	hash: string;
	net: string;
	locale: string;
	org: string;
	stack?: string;
}

const repoURL = 'https://github.com/rheinklang/web';

@Injectable({
	providedIn: 'root'
})
export class SlackService {
	constructor(private http: HttpClient) {}

	public send(payload: SlackMessageBody) {
		return this.http.post(environment.slackErrorHookURL, JSON.stringify(payload));
	}

	public sendErrorLog(err: SlackErrorPayload) {
		const stackField = err.stack ? { Stacktrace: this.buildCodeMarkdown(err.stack) } : {};

		return this.send({
			blocks: [
				// main message
				// tslint:disable-next-line: max-line-length
				this.buildTextBlock(
					`:warning: Encountered a new issue on the website under _ ${err.location} _:\n\n*${err.message} (${err.code})*`
				),
				// add all meta information
				{
					type: 'section',
					fields: this.buildFields({
						Module: err.module,
						When: err.timestamp,
						Platform: err.platform,
						Version: err.version,
						Network: err.net,
						Location: err.locale,
						Proxy: err.org,
						// add optional stacktrace information
						...stackField
					})
				},
				// add source code information
				this.buildTextBlock(`:hammer_and_wrench: *Source-Code version*:\n ${repoURL}/commit/${err.hash}`),
				// attach context
				this.context
			]
		}).subscribe();
	}

	public buildFields(fields: Record<string, string>, transformKeys = true): SlackField[] {
		return Object.keys(fields).reduce(
			(prev, curr, i) => [
				...prev,
				{
					type: 'mrkdwn',
					text: `*${transformKeys ? readableKey(curr) : curr}*\n${fields[curr]}`
				}
			],
			[] as SlackField[]
		);
	}

	public buildTextBlock(message: string): SlackBlock {
		return {
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: message
			}
		};
	}

	public buildCodeMarkdown(content: string) {
		return ['```', content, '```'].join('');
	}

	public get context(): any {
		return {
			type: 'context',
			elements: [
				{
					type: 'mrkdwn',
					text: 'This is a generated message, do not reply.'
				}
			]
		};
	}
}
