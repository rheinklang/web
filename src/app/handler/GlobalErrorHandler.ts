import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatSnackBar } from '@angular/material';
import { ERROR_NOTIFICATION_CONTENT, ERROR_NOTIFICATION_ACTION } from '../config/notifications';

@Injectable({
	providedIn: 'root',
	deps: [LogService],
})
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private log: LogService, private snackbar: MatSnackBar) {}

	public handleError(error: any) {
		(window as any).e = error;
		this.log.traceError(
			'GlobalErrorHandler',
			error || {
				name: 'GlobalErrorHandler',
				message: `Unknown application error`,
				code: 500,
			}
		);

		this.snackbar.open(ERROR_NOTIFICATION_CONTENT, ERROR_NOTIFICATION_ACTION, {
			duration: 10000,
		});
	}
}
