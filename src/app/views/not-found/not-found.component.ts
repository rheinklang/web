import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { LogService } from '../../services/log.service';

class NotFoundError extends Error {
	public code = 404;

	constructor(message: string) {
		super(message);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

@Component({
	selector: 'rk-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements AfterViewInit {
	constructor(private log: LogService) {}

	public ngAfterViewInit() {
		const message = `Invalid page request for ${this.path}, no page registered on this route`;
		this.log.traceError('NotFoundComponent', new NotFoundError(message));
	}

	public get path() {
		return document.location.pathname;
	}
}
