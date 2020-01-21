import { Injectable } from '@angular/core';
import { LoggingRequestData } from './remote-log.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PossibleSubscription, unsubscribe } from '../utils/subscription';

interface SlackField {
	type: 'text' | 'mrkdwn';
	text: string;
}

interface SlackBlock {
	type: 'section';
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
	attachments: any[];
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
	constructor(private http: HttpClient) { }

	public sendErrorLog(err: SlackErrorPayload) {
		const stackField = err.stack ? {
			Stacktrace: this.buildCodeMarkdown(err.stack)
		} : {};

		return this.http.post(environment.slackErrorHookURL, JSON.stringify({
			blocks: [
				// main message
				// tslint:disable-next-line: max-line-length
				this.buildTextBlock(`:warning: Encountered a new issue on the website under _ ${err.location} _:\n\n*${err.message} (${err.code})*`),
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
		} as SlackMessageBody)).subscribe();
	}

	private buildFields(fields: Record<string, string>) {
		return Object.keys(fields).reduce((prev, curr, i) => ([
			...prev,
			{
				type: 'mrkdwn',
				text: `*${curr}*\n${fields[curr]}`
			}
		]), [] as SlackField[]);
	}

	private buildTextBlock(message: string) {
		return {
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: message
			}
		};
	}

	private buildCodeMarkdown(content: string) {
		return ['```', content, '```'].join('');
	}

	private get context() {
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
