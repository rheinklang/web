import { Injectable, VERSION } from '@angular/core';
import { CockpitService } from './cockpit.service';
import { UAParser } from 'ua-parser-js';
import { capitalize } from '../utils/string';
import version from '../../environments/version';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

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

interface LoggingRequestData extends CreateLoggingRequestOptions {
	timestamp: string;
	location: string;
	platform: string;
	version: string;
}

@Injectable({
	providedIn: 'root'
})
export class ErrorLogService {
	constructor(private cockpitService: CockpitService) {}

	public static DEFAULT_TRACE_OPTIONS = {
		message: 'Unknown error',
		code: 500,
		module: 'RheinklangApplicationModule'
	};

	public trace(opts: ErrorLogServiceTraceOptions) {
		return this.createLoggingRequest({
			message: opts.message || ErrorLogService.DEFAULT_TRACE_OPTIONS.message,
			code: `${opts.code || ErrorLogService.DEFAULT_TRACE_OPTIONS.code}`,
			module: opts.module || ErrorLogService.DEFAULT_TRACE_OPTIONS.module
		});
	}

	public traceError(module?: string, err?: Error) {
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

		return this.cockpitService
			.post<LoggingRequestData, {}>('/forms/submit/errorLogs', {
				...opts,
				location: window.location.href,
				timestamp: new Date().toUTCString(),
				platform: this.getComputedPlatform(),
				version: `Angular ${VERSION.full}, Commit #${version.hash}, Package ${version.version}`
			})
			.subscribe();
	}

	private getComputedPlatform() {
		const parser = new UAParser(navigator.userAgent);
		const { browser, device, os, engine } = parser.getResult();

		// tslint:disable-next-line: max-line-length
		return [
			`${capitalize(device.type)}, ${device.vendor} ${device.model}`,
			`running ${os.name} ${os.version}`,
			`/ ${browser.name} ${browser.version} (${engine.name})`
		].join(' ');
	}
}
