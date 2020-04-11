import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TemplateKey, TemplateValue } from '../../../utils/templating';
import { unsubscribe } from '../../../utils/subscription';
import { SEOService } from '../../../services/seo.service';

declare var gtag;

@Component({
	selector: 'rk-seo-manager',
	templateUrl: './seo-manager.component.html',
})
export class SeoManagerComponent implements OnInit, OnDestroy {
	@Input() public context: string;
	@Input() public data: Record<TemplateKey, TemplateValue>;

	private navEndSubscription$?: Subscription;

	constructor(private seoService: SEOService) {}

	ngOnInit() {
		// get last navigation event for final route changes
		const navEndEvents = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

		// page view tracking
		this.navEndSubscription$ = navEndEvents.subscribe((event: NavigationEnd) => {
			gtag('config', environment.gtmId, {
				page_path: event.urlAfterRedirects,
			});

			this.seoService.setCurrentContext(this.context, this.data);
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.navEndSubscription$]);
	}

	public ngOnDestroy() {
		unsubscribe([this.navEndSubscription$]);
	}
}
