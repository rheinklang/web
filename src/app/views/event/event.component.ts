import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventBySlugGQLEntry } from '../../queries/EventBySlug.query';
import { unsubscribe, PossibleSubscription } from '../../utils/subscription';
import { ArticlesService } from '../../services/articles.service';
import { DeviceService } from '../../services/device.service';
import { getRandomItemsFrom } from '../../utils/random';
import { ArticlesGQLEntry } from '../../queries/Articles.query';
import { ImpressionsService } from '../../services/impressions.service';
import { generateUrchingTrackingURL } from '../../utils/utm';

@Component({
	selector: 'rk-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EventComponent implements OnInit, OnDestroy {
	public impressionTitle: string;
	public eventSlug: string;
	public event: EventBySlugGQLEntry;
	public articles: ArticlesGQLEntry[] = [];

	private routeSub$: PossibleSubscription;
	private eventSub$: PossibleSubscription;
	private articlesSub$: PossibleSubscription;

	constructor(
		private route: ActivatedRoute,
		private deviceService: DeviceService,
		private eventsService: EventsService,
		private articlesService: ArticlesService,
		private impressionsService: ImpressionsService
	) {}

	public ngOnInit() {
		this.articlesSub$ = this.articlesService.getArticles().subscribe((entries) => {
			this.articles = getRandomItemsFrom(entries, 3);
		});

		this.routeSub$ = this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('eventSlug')) {
				// skip if no event slug is present
				return;
			}

			this.eventSlug = paramMap.get('eventSlug');
			this.eventSub$ = this.eventsService.getEventBySlug(this.eventSlug).subscribe((event) => {
				this.event = event;

				if (event.impression) {
					this.impressionsService.getImpressionsPageData().subscribe((data) => {
						if (data) {
							this.impressionTitle = data.title;
						}
					});
				}
			});
		});
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}

	public ngOnDestroy() {
		unsubscribe([this.routeSub$, this.eventSub$, this.articlesSub$]);
	}

	public get trackableCheckoutLink() {
		return this.event.tickets.externalShopLink;
	}

	public get impression() {
		let images = [];

		if (this.event && this.event.impression && this.event.impression.images) {
			// get only the first 4 images even if there are more or less
			images = this.event.impression.images.map((img) => img.value).slice(0, 4);
		}

		return {
			title: this.event.impression.title,
			description: this.event.impression.description,
			slug: this.event.impression.slug,
			images,
		};
	}

	public get shouldShowMaps() {
		const { deviceService, event } = this;

		if (deviceService.getIsMobile()) {
			return false;
		}

		return event && event.location && event.location.googleMapsURL;
	}
}
