import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesGQLEntry } from '../../queries/Articles.query';

@Component({
	selector: 'rk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public articles: ArticlesGQLEntry[] = [];

	constructor(private articlesService: ArticlesService) { }

	public ngOnInit() {
		this.articlesService.getArticles().subscribe(articles => {
			this.articles = articles;
		});
	}

	public get tags() {
		return this.articles.reduce((allTags, article) => [...allTags, ...article.tags], [] as string[]);
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}
}
