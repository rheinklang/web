import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { LiveStreamService } from '../../../services/livestream.service';
import { LiveStreamSchema } from '../../../schema/LiveStreamSchema';
import { unsubscribe } from '../../../utils/subscription';

@Component({
	selector: 'rk-livestream-indicator',
	templateUrl: './livestream-indicator.component.html',
	styleUrls: ['./livestream-indicator.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LivestreamIndicatorComponent implements OnInit, OnDestroy {
	public isIndicatorDisabledByPageData = true;
	public liveStreamData?: LiveStreamSchema;
	private routeSubscription$?: Subscription;
	private streamSubscription$?: Subscription;

	constructor(private route: ActivatedRoute, private router: Router, private liveStreamService: LiveStreamService) {}

	ngOnInit() {
		this.streamSubscription$ = this.liveStreamService.getLiveStream().subscribe((data) => {
			this.liveStreamData = data;
		});

		this.routeSubscription$ = this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let child = this.route.firstChild;
					while (child) {
						if (child.firstChild) {
							child = child.firstChild;
						} else if (
							child.snapshot.data &&
							typeof child.snapshot.data.disableLiveIndicator !== 'undefined'
						) {
							return child.snapshot.data.disableLiveIndicator;
						}

						return null;
					}
					return null;
				})
			)
			.subscribe((disableLiveIndicator?: boolean) => {
				if (!disableLiveIndicator) {
					this.isIndicatorDisabledByPageData = false;
				}
			});
	}

	public ngOnDestroy() {
		unsubscribe([this.routeSubscription$, this.streamSubscription$]);
	}

	public get isVisible() {
		return !this.isIndicatorDisabledByPageData && this.liveStreamData && this.liveStreamData.enabled === true;
	}
}
