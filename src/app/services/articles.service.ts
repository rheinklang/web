import { Injectable } from '@angular/core';
import { map, first, flatMap } from 'rxjs/operators';
import { ArticlesGQL } from '../queries/Articles.query';
import { ArticleByIdGQL } from '../queries/ArticleById.query';

@Injectable({
	providedIn: 'root'
})
export class ArticlesService {
	private preloadedArticleIds: string[] = [];

	constructor(private articlesGQL: ArticlesGQL, private articleByIdGQL: ArticleByIdGQL) { }

	public getArticles() {
		return this.articlesGQL.watch(undefined, {
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(
			map(res => res.data.articlesCollection)
		);
	}

	public getArticleById(id: string) {
		return this.articleByIdGQL.watch({
			filter: {
				_id: id
			}
		}, {
				fetchPolicy: 'network-only'
			}).valueChanges.pipe(
				map(res => res.data.articlesCollection),
				flatMap(entry => entry),
				first()
			);
	}

	public preloadArticleById(id: string) {
		if (this.preloadedArticleIds.indexOf(id) > -1) {
			return;
		}

		this.preloadedArticleIds.push(id);

		this.articleByIdGQL.watch({
			filter: {
				_id: id
			}
		}).valueChanges.subscribe();
	}
}
