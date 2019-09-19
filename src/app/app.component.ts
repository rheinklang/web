import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var gtag;

@Component({
	selector: 'rk-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(router: Router) {
		if (typeof gtag === 'undefined') {
			// no google tag manager instance found, skip analytics
			return;
		}

		const navEndEvents = router.events.pipe(
			filter(
				event => event instanceof NavigationEnd
			)
		);

		navEndEvents.subscribe(
			(event: NavigationEnd) => {
				gtag('config', 'UA-XXXXXXXXX-X', {
					page_path: event.urlAfterRedirects,
				});
			}
		);
	}
}
