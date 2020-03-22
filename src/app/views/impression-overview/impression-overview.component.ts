import { Subscription } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import Tilt from 'vanilla-tilt';
import { ImpressionsService } from '../../services/impressions.service';
import { ImpressionsGQLEntry } from '../../queries/Impressions.query';
import { getContrastModifierForImage } from '../../utils/colors';
import { ImpressionsSingletonGQLResponse } from '../../queries/Impressions.singleton';
import { unsubscribe } from '../../utils/subscription';

@Component({
	selector: 'rk-impression-overview',
	templateUrl: './impression-overview.component.html',
	styleUrls: ['./impression-overview.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ImpressionOverviewComponent implements OnInit, OnDestroy {
	public impressions: ImpressionsGQLEntry[] = [];
	public pageData?: ImpressionsSingletonGQLResponse['impressionsSingleton'];

	private impressionsSubscription$?: Subscription;
	private pageDataSubscription$?: Subscription;

	constructor(private impressionsService: ImpressionsService) {}

	public ngOnInit() {
		this.impressionsSubscription$ = this.impressionsService.getImpressions().subscribe((impressions) => {
			this.impressions = impressions;
			this.enableTilt();
		});

		this.pageDataSubscription$ = this.impressionsService.getImpressionsPageData().subscribe((pageData) => {
			if (pageData && 'title' in pageData) {
				this.pageData = pageData;
			}
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.impressionsSubscription$, this.pageDataSubscription$]);
	}

	public preloadImpressionBySlug(slug: string) {
		this.impressionsService.preloadImpressionBySlug(slug);
	}

	public getEntryModifier(impression: ImpressionsGQLEntry) {
		return getContrastModifierForImage(impression.showcaseImage);
	}

	private enableTilt() {
		Tilt.init((document.querySelectorAll('.v-impressions-overview__entry') as any) as HTMLElement[], {
			max: 25,
			speed: 400,
			glare: true,
			'max-glare': 0.4,
		});
	}
}
