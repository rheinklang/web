import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorLogService } from '../../services/error-log.service';

@Component({
	selector: 'rk-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
	constructor(private route: ActivatedRoute, private errorLogService: ErrorLogService) {}

	public ngOnInit() {
		this.errorLogService.trace({
			message: `Invalid page request for ${this.path}`,
			module: 'NotFoundComponent',
			code: 404
		});
	}

	public get path() {
		return this.route.snapshot.url.join('/');
	}
}
