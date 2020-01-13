import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { injectGTMScript } from './app.gtm';
import { environment } from '../environments/environment';
import { trackGTMTimingEvent } from './utils/gtag';

declare var gtag;

// load environment specific tracking initialization
injectGTMScript();

@Component({
	selector: 'rk-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(router: Router) {
		debugger;
		console.log('AppComponent ctor');

		// no google tag manager instance found, skip analytics
		if (typeof gtag === 'undefined') {
			return;
		}

		// track initial page view time
		trackGTMTimingEvent();

		// get last navigation event for final route changes
		const navEndEvents = router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		);

		// page view tracking
		navEndEvents.subscribe((event: NavigationEnd) => {
			gtag('config', environment.gtmId, {
				page_path: event.urlAfterRedirects
			});
		});
	}
}
