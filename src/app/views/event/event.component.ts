import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventBySlugGQLEntry } from '../../queries/EventBySlug.query';
import { generateUrchingTrackingURL } from '../../utils/utm';
import { unsubscribe, PossibleSubscription } from '../../utils/subscription';
import { ArticlesService } from '../../services/articles.service';
import { DeviceService } from '../../services/device.service';
import { getRandomItemsFrom } from '../../utils/random';
import { ArticlesGQLEntry } from '../../queries/Articles.query';

@Component({
	selector: 'rk-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
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
		private articlesService: ArticlesService
	) { }

	public ngOnInit() {
		this.articlesSub$ = this.articlesService.getArticles().subscribe(entries => {
			this.articles = getRandomItemsFrom(entries, 3);
		});

		this.routeSub$ = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('eventSlug')) {
				// skip if no event slug is present
				return;
			}

			this.eventSlug = paramMap.get('eventSlug');
			this.eventSub$ = this.eventsService.getEventBySlug(this.eventSlug).subscribe(event => {
				this.event = event;
			});
		});
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}

	public ngOnDestroy() {
		unsubscribe([this.routeSub$, this.eventSub$, this.articlesSub$]);
	}

	public get shouldShowMaps() {
		const { deviceService, event } = this;

		if (deviceService.getIsMobile()) {
			return false;
		}

		return event && event.location && event.location.googleMapsURL;
	}
}
