import Glide from '@glidejs/glide';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesGQLEntry } from '../../queries/Articles.query';
import { HomeService } from '../../services/home.service';
import { HomeSingletonGQLSlideItem } from '../../queries/Home.singleton';
import { Subscription } from 'rxjs';

@Component({
	selector: 'rk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	public activeTagId?: string;
	public articles: ArticlesGQLEntry[] = [];
	public slides: (HomeSingletonGQLSlideItem & { index: number })[] = [];

	private articlesSub$: Subscription | undefined;
	private homeSub$: Subscription | undefined;

	constructor(private articlesService: ArticlesService, private homeService: HomeService) {}

	public ngOnInit() {
		this.articlesSub$ = this.articlesService.getArticles().subscribe(articles => {
			this.articles = articles;
		});

		this.homeSub$ = this.homeService.getSlides().subscribe(slides => {
			this.slides = slides;

			if (slides.length > 0) {
				const tid = setTimeout(() => {
					try {
						this.initSlider();
					} catch (err) {
						// slider initialization failed
					}

					clearTimeout(tid);
				}, 5);
			}
		});
	}

	public ngOnDestroy() {
		if (this.articlesSub$) {
			this.articlesSub$.unsubscribe();
		}

		if (this.homeSub$) {
			this.homeSub$.unsubscribe();
		}
	}

	public get tags() {
		return this.articles.reduce(
			(allTags, article) => [...allTags, ...article.tags],
			[] as string[]
		);
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}

	private initSlider() {
		new Glide('.js-v-about__header-slider', {
			focusAt: 'center',
			gap: 0,
			autoplay: 8000, // ms
			hoverpause: true,
			swipeThreshold: 100, // px
			animationDuration: 500
		}).mount();
	}

	public setActiveTag(id: string) {
		if (this.activeTagId === id) {
			this.activeTagId = undefined;
		} else {
			this.activeTagId = id;
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

		return false;
	}

	public getCurrentArticleCount() {
		if (!this.activeTagId) {
			return this.articles.length;
		}

		return this.articles.filter(this.articleContainsActiveTag).length;
	}

	public get articlesLoaded() {
		return this.articles.length > 0;
	}
}
