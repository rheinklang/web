import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorLogService } from '../services/error-log.service';

@Injectable({
	providedIn: 'root',
	deps: [ErrorLogService]
})
export class GlobalErrorHandler implements ErrorHandler {

	constructor(private errorLogService: ErrorLogService) { }

	public handleError(error: any) {
		this.errorLogService.traceError('GlobalErrorHandler', error);
	}
}
