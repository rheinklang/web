import { Injectable } from '@angular/core';

export interface LogServiceTraceOptions {
	message?: string;
	code?: number | string;
	module?: string;
	stack?: string;
}

@Injectable({
	providedIn: 'root'
})
export class LogService {
	public trace(opts: LogServiceTraceOptions) {
		console.error(`[${opts.module}] ${opts.message} (${opts.code})\n\n${opts.stack || 'No stack available'}`);
	}

	public traceError(module?: string, err: Error = { message: 'Unknown error', name: 'Tracer' }) {
		return this.trace({
			module,
			message: err.message,
			code: err.name,
			stack: err.stack
		});
	}
}
