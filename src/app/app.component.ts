import { filter } from 'rxjs/operators';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { injectGTMScript } from './app.gtm';
import { environment } from '../environments/environment';
import { trackGTMTimingEvent } from './utils/gtag';
import { Subscription } from 'rxjs';
import { unsubscribe } from './utils/subscription';
import { injectGCPMapsScript } from './app.gcp';
import { ConfigService } from './services/config.service';

declare var gtag;

// load environment specific tracking initialization
injectGTMScript();

// load environment specific gcp scripts
injectGCPMapsScript();

@Component({
	selector: 'rk-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
	public maintenanceConfig: ReturnType<ConfigService['getMaintenanceConfig']>;
	private navEndSub$: Subscription;
	private gMapCbAttached = false;

	constructor(router: Router, route: ActivatedRoute, configService: ConfigService) {
		if (!this.gMapCbAttached) {
			this.gMapCbAttached = true;
		}

		// the configuration has been prefetched in the global `APP_INITIALIZER` provider
		this.maintenanceConfig = configService.getMaintenanceConfig();

		// no google tag manager instance found, skip analytics
		if (typeof gtag !== 'undefined') {
			// track initial page view time
			trackGTMTimingEvent();

			// get last navigation event for final route changes
			const navEndEvents = router.events.pipe(filter((event) => event instanceof NavigationEnd));

			// page view tracking
			this.navEndSub$ = navEndEvents.subscribe((event: NavigationEnd) => {
				// wait for seo-context loaded and page ready
				const tid = setTimeout(() => {
					gtag('config', environment.gtmId, {
						page_title: document.title,
						page_location: document.URL,
						page_path: event.urlAfterRedirects,
					});
					clearTimeout(tid);
				}, 160);
			});
		}
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
