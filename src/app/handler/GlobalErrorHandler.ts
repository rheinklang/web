import { ErrorHandler, Injectable } from '@angular/core';
import { LogService } from '../services/log.service';
import { MatSnackBar } from '@angular/material';
import { ERROR_NOTIFICATION_CONTENT, ERROR_NOTIFICATION_ACTION } from '../config/notifications';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
	deps: [LogService],
})
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private log: LogService, private snackbar: MatSnackBar) {}

	public handleError(error: any) {
		if (!environment.production) {
			(window as any).e = error;
			console.log(error);
		}

		this.log.traceError(
			'GlobalErrorHandler',
			error || {
				name: 'GlobalErrorHandler',
				message: environment.production ? `Unknown application error` : `${error}`,
				code: 500,
			}
		);

		this.snackbar.open(ERROR_NOTIFICATION_CONTENT, ERROR_NOTIFICATION_ACTION, {
			duration: 10000,
		});
	}
}
