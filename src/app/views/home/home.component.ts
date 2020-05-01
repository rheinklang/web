import { Component, OnInit, OnDestroy } from '@angular/core';
import { PossibleSubscription, unsubscribe } from '../../utils/subscription';
import { sortByDate } from '../../utils/sort';
import { excerptWords } from '../../utils/string';
import { isMobileDevice } from '../../utils/device';
import { ArticlesGQLEntry } from '../../queries/Articles.query';
import { EventBySlugGQLEntry } from '../../queries/EventBySlug.query';
import { ArticlesService } from '../../services/articles.service';
import { HomeService } from '../../services/home.service';
import { EventsService } from '../../services/events.service';
import { StageSliderSlide } from '../../components/organisms/stage-slider/stage-slider.component';
import { trackGTMEvent } from 'app/utils/gtag';

@Component({
	selector: 'rk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	public activeTagId?: string;
	public articles: ArticlesGQLEntry[] = [];
	public filteredArticles: ArticlesGQLEntry[] = [];
	public eventTeaser: EventBySlugGQLEntry | null = null;
	public slides: StageSliderSlide[] = [];

	private articlesSub$: PossibleSubscription;
	private eventTeaserSub$: PossibleSubscription;
	private homeSub$: PossibleSubscription;

	constructor(
		private articlesService: ArticlesService,
		private homeService: HomeService,
		private eventsService: EventsService
	) {}

	public ngOnInit() {
		const isMobile = isMobileDevice();

		this.articlesSub$ = this.articlesService.getArticles().subscribe((articles) => {
			// order all articles by ISO date
			this.articles = sortByDate(articles, (article) => article.releaseDate);

			// use initial articles at the beginning
			this.filteredArticles = this.articles;
		});

		this.eventTeaserSub$ = this.homeService.getEventTeaser().subscribe((teaser) => {
			this.eventTeaser = teaser;
		});

		this.homeSub$ = this.homeService.getSlides().subscribe((slides) => {
			this.slides = slides.map((slide) => ({
				title: slide.title,
				text: isMobile ? excerptWords(slide.content, slide.ctaLink ? 180 : 210) : slide.content,
				image: slide.image ? slide.image.path : '',
				ctaLink: slide.ctaLink,
				ctaText: slide.ctaText,
			}));
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.articlesSub$, this.homeSub$, this.eventTeaserSub$]);
	}

	public get tags() {
		return this.articles.reduce(
			(allTags, article) => {
				const newTags = article.tags
					.map((tag) => (allTags.indexOf(tag) === -1 ? tag : null))
					.filter(Boolean);
				return [...allTags, ...newTags];
			},
			[] as string[]
		);
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}

	public preloadEvent(slug: string) {
		this.eventsService.preloadEventBySlug(slug);
	}

	public setActiveTag(id: string) {
		if (this.activeTagId === id) {
			this.activeTagId = undefined;
			this.filteredArticles = this.articles;
		} else if (this.activeTagId !== id) {
			// only update if tag changed
			this.activeTagId = id;
			this.filteredArticles = this.articles.filter((article) => this.articleContainsActiveTag(article));
		}
	}

	public articleContainsActiveTag(article: ArticlesGQLEntry) {
		if (!this.activeTagId) {
			// no filter set, should render
			return true;
		}

		if (article.tags.indexOf(this.activeTagId) > -1) {
			// contains tag, should render
			return true;
		}

		// filter not matching, do not render
		return false;
	}

	public getCurrentArticleCount() {
		if (!this.activeTagId) {
			return this.articles.length;
		}

		return this.articles.filter((art) => this.articleContainsActiveTag(art)).length;
	}

	public get articlesLoaded() {
		return this.articles.length > 0;
	}
}
