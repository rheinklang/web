import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'rk-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
	constructor(private route: ActivatedRoute) {}

	public get path() {
		return this.route.snapshot.url.join('/');
	}
}
