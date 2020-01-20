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
}

@Injectable({
	providedIn: 'root'
})
export class SlackService {
	constructor(private http: HttpClient) { }

	public sendErrorLog(stack: SlackErrorPayload) {
		return this.http.post(environment.slackErrorHookURL, JSON.stringify({
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `Encountered a new issue on _ ${stack.location} _:\n*${stack.message} (${stack.code})*`
					}
				},
				{
					type: 'section',
					fields: this.buildFields({
						Module: stack.module,
						When: stack.timestamp,
						Platform: stack.platform,
						Version: stack.version,
					})
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `:hammer_and_wrench: *Source-Code version*:\n https://github.com/rheinklang/web/commit/${stack.hash}`
					}
				},
				{
					type: 'context',
					elements: [
						{
							type: 'mrkdwn',
							text: 'This is a generated message, do not reply.'
						}
					]
				}
			]
		} as SlackMessageBody)).subscribe().unsubscribe();
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
}
