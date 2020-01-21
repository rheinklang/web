import { Injectable, VERSION } from '@angular/core';
import { CockpitService } from './cockpit.service';
import { UAParser } from 'ua-parser-js';
import { capitalize } from '../utils/string';
import version from '../../environments/version';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { PossibleSubscription, unsubscribe } from '../utils/subscription';
import { SlackService } from './slack.service';
import { IPService } from './ip.service';
import { LogServiceTraceOptions } from './log.service';

interface CreateLoggingRequestOptions {
	message: string;
	code: string;
	module: string;
	stack?: string;
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
export class RemoteLogService {
	public static DEFAULT_TRACE_OPTIONS = {
		message: 'Unknown error',
		code: 500,
		module: 'RheinklangApplicationModule'
	};

	private enableDevMode = false;
	private lastErrorSignature: string | null = null;
	private lastIPTrace: string | null = null;

	constructor(
		private cockpit: CockpitService,
		private slack: SlackService,
		private ip: IPService
	) { }

	public trace(opts: LogServiceTraceOptions) {
		return this.createLoggingRequest({
			message: opts.message || RemoteLogService.DEFAULT_TRACE_OPTIONS.message,
			code: `${opts.code || RemoteLogService.DEFAULT_TRACE_OPTIONS.code}`,
			module: opts.module || RemoteLogService.DEFAULT_TRACE_OPTIONS.module
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
		if (this.lastErrorSignature && (this.getErrorSignature(opts) === this.lastErrorSignature)) {
			// issue was already sent to the API
			return;
		}

		const payload: LoggingRequestData = {
			...opts,
			location: window.location.href,
			timestamp: new Date().toUTCString(),
			platform: this.getComputedPlatform(),
			version: `Angular ${VERSION.full}, Commit \`#${version.hash}\`, Package ${version.version}`
		};

		this.lastErrorSignature = this.getErrorSignature(opts);

		this.ip.getIP().subscribe(ipInfo => {
			if (this.lastIPTrace === ipInfo.ip) {
				// same host, do not send issue
				return;
			}

			this.lastIPTrace = ipInfo.ip;
			// send message to slack
			this.slack.sendErrorLog({
				...payload,
				hash: version.hash,
				net: `${ipInfo.ip}`,
				locale: `${ipInfo.country}, ${ipInfo.region}, ${ipInfo.city}`,
				org: ipInfo.org || 'unknown',
				stack: opts.stack
			});
		});

		// send log in parallel to cockpit
		this.cockpit
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
			`${deviceInfo} – ${os.name} ${os.version}`,
			`/ ${browser.name} ${browser.version} (${engine.name})`
		].join(' ');
	}

	private getErrorSignature(opts: CreateLoggingRequestOptions) {
		return `${opts.module}_${opts.code}_${opts.message}`;
	}
}
