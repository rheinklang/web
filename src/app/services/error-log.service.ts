import { Injectable, VERSION } from '@angular/core';
import { CockpitService } from './cockpit.service';
import { UAParser } from 'ua-parser-js';
import { capitalize } from '../utils/string';
import version from '../../environments/version';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { PossibleSubscription, unsubscribe } from '../utils/subscription';
import { SlackService } from './slack.service';

interface ErrorLogServiceTraceOptions {
	message?: string;
	code?: number | string;
	module?: string;
}

interface CreateLoggingRequestOptions {
	message: string;
	code: string;
	module: string;
}

export interface LoggingRequestData {
	message: string;
	code: string;
	module: string;
	timestamp: string;
	location: string;
	platform: string;
	version: string;
}

@Injectable({
	providedIn: 'root'
})
export class ErrorLogService {
	public static DEFAULT_TRACE_OPTIONS = {
		message: 'Unknown error',
		code: 500,
		module: 'RheinklangApplicationModule'
	};

	constructor(private cockpitService: CockpitService, private slackService: SlackService) { }

	public trace(opts: ErrorLogServiceTraceOptions) {
		return this.createLoggingRequest({
			message: opts.message || ErrorLogService.DEFAULT_TRACE_OPTIONS.message,
			code: `${opts.code || ErrorLogService.DEFAULT_TRACE_OPTIONS.code}`,
			module: opts.module || ErrorLogService.DEFAULT_TRACE_OPTIONS.module
		});
	}

	public traceError(module?: string, err: Error = { message: 'Unknown error', name: 'Tracer' }) {
		return this.trace({
			module,
			message: err.message,
			code: err.name
		});
	}

	private createLoggingRequest(opts: CreateLoggingRequestOptions): Subscription | null {
		if (!environment.production) {
			// disable remote logging on non-production systems
			return null;
		}

		const payload: LoggingRequestData = {
			...opts,
			location: window.location.href,
			timestamp: new Date().toUTCString(),
			platform: this.getComputedPlatform(),
			version: `Angular ${VERSION.full}, Commit \`#${version.hash}\`, Package ${version.version}`
		};

		// send message to slack
		this.slackService.sendErrorLog({
			...payload,
			hash: version.hash
		});

		// send log to cockpit
		this.cockpitService
			.post<LoggingRequestData, {}>('/forms/submit/logs', payload)
			.subscribe();
	}

	private getComputedPlatform() {
		const parser = new UAParser(navigator.userAgent);
		const { browser, device, os, engine } = parser.getResult();

		const deviceInfo = device.type && device.vendor ?
			`${capitalize(device.type)}, ${device.vendor} ${device.model}`
			: 'Desktop';

		// tslint:disable-next-line: max-line-length
		return [
			`${deviceInfo} running ${os.name} ${os.version}`,
			`/ ${browser.name} ${browser.version} (${engine.name})`
		].join(' ');
	}
}
