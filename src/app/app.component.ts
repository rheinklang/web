import { filter } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { injectGTMScript } from './app.gtm';
import { environment } from '../environments/environment';
import { trackGTMTimingEvent } from './utils/gtag';
import { Subscription } from 'rxjs';
import { unsubscribe } from './utils/subscription';
import { injectGCPMapsScript } from './app.gcp';

declare var gtag;

// load environment specific tracking initialization
injectGTMScript();

// load environment specific gcp scripts
injectGCPMapsScript();

@Component({
	selector: 'rk-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
	private navEndSub$: Subscription;
	private gMapCbAttached = false;

	constructor(router: Router, route: ActivatedRoute) {
		if (!this.gMapCbAttached) {
			this.gMapCbAttached = true;
		}

		// no google tag manager instance found, skip analytics
		if (typeof gtag === 'undefined') {
			return;
		}

		// track initial page view time
		trackGTMTimingEvent();

		// get last navigation event for final route changes
		const navEndEvents = router.events.pipe(filter((event) => event instanceof NavigationEnd));

		// route.params.subscribe(d => console.log(d));
		console.log(route.snapshot.data);

		// page view tracking
		this.navEndSub$ = navEndEvents.subscribe((event: NavigationEnd) => {
			gtag('config', environment.gtmId, {
				page_path: event.urlAfterRedirects,
			});
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.navEndSub$]);
	}

	public onActivate() {
		window.scroll(0, 0);
		// or document.body.scrollTop = 0;
		// sor document.querySelector('body').scrollTo(0,0)
	}
}
