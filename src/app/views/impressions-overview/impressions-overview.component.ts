import {
	Component,
	OnInit,
	ViewEncapsulation,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ImpressionsService } from '../../services/impressions.service';
import { ImpressionsGQLEntry } from '../../queries/Impressions.query';
import { getContrastModifierForImage } from '../../utils/colors';
import { ImpressionsSingletonGQLResponse } from '../../queries/Impressions.singleton';
import { unsubscribe } from '../../utils/subscription';

@Component({
	templateUrl: './impressions-overview.component.html',
	styleUrls: ['./impressions-overview.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpressionsOverviewComponent implements OnInit, OnDestroy {
	public impressions: ImpressionsGQLEntry[] = [];
	public pageData?: ImpressionsSingletonGQLResponse['impressionsSingleton'];

	private impressionsSubscription$?: Subscription;
	private pageDataSubscription$?: Subscription;

	constructor(private impressionsService: ImpressionsService, private cd: ChangeDetectorRef) {}

	public ngOnInit() {
		this.impressionsSubscription$ = this.impressionsService.getImpressions().subscribe((impressions) => {
			this.impressions = impressions;
			this.cd.detectChanges();
		});

		this.pageDataSubscription$ = this.impressionsService.getImpressionsPageData().subscribe((pageData) => {
			if (pageData && 'title' in pageData) {
				this.pageData = pageData;
				this.cd.detectChanges();
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
		if (impression.showcaseTextColor && impression.showcaseTextColor !== 'auto') {
			// return override from CMS if available
			return impression.showcaseTextColor;
		}

		return getContrastModifierForImage(impression.showcaseImage);
	}
}
