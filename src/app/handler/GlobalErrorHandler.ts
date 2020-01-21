import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';

@Injectable({
	providedIn: 'root',
	deps: [LogService]
})
export class GlobalErrorHandler implements ErrorHandler {

	constructor(private log: LogService) { }

	public handleError(error: any) {
		this.log.traceError('GlobalErrorHandler', error || {
			name: 'GlobalErrorHandler',
			message: `Unknown application error`,
			code: 500
		});
	}
}
