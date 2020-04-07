import { Component, OnInit, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImpressionsService } from '../../services/impressions.service';
import { unsubscribe } from '../../utils/subscription';
import { ImpressionSchema } from '../../schema/ImpressionSchema';

@Component({
	selector: 'rk-impression',
	templateUrl: './impression.component.html',
	styleUrls: ['./impression.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ImpressionComponent implements OnInit, OnDestroy, AfterContentInit {
	public impressionSlug?: string;
	public loaded = false;
	public impression: ImpressionSchema;

	private impressionSubscription$: Subscription;
	private masonry?: typeof import('masonry-layout').prototype;

	constructor(private route: ActivatedRoute, private impressionsService: ImpressionsService) {}

	public ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			this.impressionSlug = params.get('impressionSlug');

			if (this.impressionSlug) {
				this.fetchCorrespondingImpression(this.impressionSlug);
			}
		});
	}

	public ngOnDestroy() {
		if (this.masonry) {
			this.masonry.destroy();
		}

		unsubscribe([this.impressionSubscription$]);
	}

	public get seoData() {
		if (!this.impression) {
			return {};
		}

		return {
			...this.impression,
			og_image: this.impression.images[0].value,
		};
	}

	public ngAfterContentInit() {
		// import(/* webpackChunkName: "masnory-layout" */ 'masonry-layout').then(module => {
		// 	console.log('init')
		// 	// TODO: typing is wrong, create custom types
		// 	this.masonry = new (module as any).default('.v-impression__gallery', {
		// 		itemSelector: '.v-impression__gallery-entry',
		// 		columnWidth: 0.8,
		// 		percentPosition: true,
		// 		transitionDuration: 250
		// 	});
		// });
	}

	public get images() {
		return (this.impression.images || []).map((image) => image.value);
	}

	private fetchCorrespondingImpression(slug: string) {
		this.impressionSubscription$ = this.impressionsService.getImpressionBySlug(slug).subscribe((impression) => {
			this.impression = impression;
			this.loaded = true;
		});
	}
}
