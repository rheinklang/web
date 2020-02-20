import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { FlyoutService } from '../../../services/flyout.service';
import { NavigationSingletonGQLResponse } from '../../../queries/Navigation.singleton';
import { Subscription } from 'rxjs';
import { unsubscribe } from '../../../utils/subscription';

@Component({
	selector: 'rk-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() public flyoutNavigationOpen = false;

	public navigationItems: Array<{ url: string; title: string }> = [];
	public navigationTitles: NavigationSingletonGQLResponse['navigationSingleton'] = {} as NavigationSingletonGQLResponse['navigationSingleton'];

	private flyoutChangeDetectionSub$: Subscription;
	private navigationServiceSub$: Subscription;

	constructor(private navigationService: NavigationService, private flyoutService: FlyoutService) {}

	public ngOnInit() {
		this.flyoutChangeDetectionSub$ = this.flyoutService.changeDetection.subscribe(() => {
			this.flyoutNavigationOpen = this.flyoutService.isOpen;
		});

		this.navigationServiceSub$ = this.navigationService.getNavigationTitles().subscribe(data => {
			this.navigationTitles = data;
			this.navigationItems = [
				{ url: '/', title: data.homeTitle },
				{ url: '/events', title: data.eventsTitle },
				{ url: '/impressions', title: data.galleriesTitle },
				{ url: '/sponsors', title: data.sponsorsTitle },
				{ url: '/about', title: data.aboutTitle },
				{ url: '/contact', title: data.contactTitle }
			];
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.flyoutChangeDetectionSub$, this.navigationServiceSub$]);
	}

	public setFlyoutState(isOpen: boolean) {
		isOpen ? this.flyoutService.open() : this.flyoutService.close();
	}

	public hideFlyoutNavigation() {
		this.flyoutService.close();
	}
}
