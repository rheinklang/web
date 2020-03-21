import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImpressionsService } from '../../services/impressions.service';
import { ImpressionsGQLEntry } from '../../queries/Impressions.query';
import { getContrastModifierForImage } from '../../utils/colors';

@Component({
	selector: 'rk-impression-overview',
	templateUrl: './impression-overview.component.html',
	styleUrls: ['./impression-overview.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ImpressionOverviewComponent implements OnInit {
	public impressions: ImpressionsGQLEntry[] = [];

	constructor(private impressionsService: ImpressionsService) {}

	ngOnInit() {
		this.impressionsService.getImpressions().subscribe(impressions => {
			this.impressions = impressions;
		});
	}

	public preloadImpressionBySlug(slug: string) {
		this.impressionsService.preloadImpressionBySlug(slug);
	}

	public getEntryModifier(impression: ImpressionsGQLEntry) {
		return getContrastModifierForImage(impression.showcaseImage);
	}
}
