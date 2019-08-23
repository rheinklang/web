import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticleSchema } from '../../queries/articles';

@Component({
	selector: 'rk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public articles: ArticleSchema[] = [];

	constructor(private articlesService: ArticlesService) { }

	public ngOnInit() {
		this.articlesService.getArticles().subscribe(({ data }) => {
			this.articles = data.articlesCollection;
		});
	}

	public get tags() {
		return this.articles.reduce((allTags, article) => [...allTags, ...article.tags], [] as string[]);
	}
}
