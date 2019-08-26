import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleGQLEntry } from '../../queries/ArticleById.query';
import { ArticlesService } from '../../services/articles.service';

@Component({
	selector: 'rk-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
	public article: ArticleGQLEntry;

	constructor(private route: ActivatedRoute, private articlesService: ArticlesService) { }

	public ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const articleId = params.get('articleId');

			if (articleId) {
				this.fetchCorrespondingArticle(articleId);
			}
		});
	}

	private fetchCorrespondingArticle(id: string) {
		this.articlesService.getArticleById(id).subscribe(article => {
			this.article = article;
		});
	}

}
