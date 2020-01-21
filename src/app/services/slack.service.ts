import { Injectable } from '@angular/core';
import { LoggingRequestData } from './error-log.service';
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
}

const repoURL = 'https://github.com/rheinklang/web';

@Injectable({
	providedIn: 'root'
})
export class SlackService {
	constructor(private http: HttpClient) { }

	public sendErrorLog(stack: SlackErrorPayload) {
		return this.http.post(environment.slackErrorHookURL, JSON.stringify({
			blocks: [
				// main message
				// tslint:disable-next-line: max-line-length
				this.buildTextBlock(`:warning: Encountered a new issue on the website under _ ${stack.location} _:\n\n*${stack.message} (${stack.code})*`),
				// add all meta information
				{
					type: 'section',
					fields: this.buildFields({
						Module: stack.module,
						When: stack.timestamp,
						Platform: stack.platform,
						Version: stack.version,
						Network: stack.net,
						Location: stack.locale,
						Proxy: stack.org
					})
				},
				// add source code information
				this.buildTextBlock(`:hammer_and_wrench: *Source-Code version*:\n ${repoURL}/commit/${stack.hash}`),
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
