import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleGQLEntry } from '../../queries/ArticleById.query';
import { ArticlesService } from '../../services/articles.service';
import { unsubscribe } from '../../utils/subscription';
import { rtfToPlain } from 'app/utils/rtf';

@Component({
	selector: 'rk-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit, OnDestroy {
	public article: ArticleGQLEntry;
	public loaded = false;
	public articleId: string | null = null;
	public plainBody: string;

	private routeSub$: Subscription;
	private articleSub$: Subscription;

	constructor(private route: ActivatedRoute, private articlesService: ArticlesService) {}

	public ngOnInit() {
		this.routeSub$ = this.route.paramMap.subscribe((params) => {
			// TODO: parameter should be "articleSlug"
			const articleId = params.get('articleId');

			if (articleId) {
				this.articleId = articleId;
				this.fetchCorrespondingArticle(articleId);
			}
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.routeSub$, this.articleSub$]);
	}

	public get seoData() {
		return {
			content: this.plainBody,
			title: this.article.title || '...',
			og_image: this.article.previewImage || null,
		};
	}

	private fetchCorrespondingArticle(slug: string) {
		this.articleSub$ = this.articlesService.getArticleBySlug(slug).subscribe((article) => {
			this.article = article;
			this.loaded = true;
			this.plainBody = rtfToPlain(article.content);
		});
	}
}
