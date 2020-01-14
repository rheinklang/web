import { Injectable } from '@angular/core';
import { map, first, flatMap } from 'rxjs/operators';
import { ArticlesGQL } from '../queries/Articles.query';
import { ArticleByIdGQL } from '../queries/ArticleById.query';
import { CACHED_POLICY, CACHE_AND_UPDATE_POLICY, REFETCH_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class ArticlesService {
	private preloadedArticleIds: string[] = [];

	constructor(private articlesGQL: ArticlesGQL, private articleByIdGQL: ArticleByIdGQL) {}

	public getArticles() {
		console.log('getArticles');
		return this.articlesGQL
			.watch(undefined, {
				fetchPolicy: REFETCH_POLICY
			})
			.valueChanges.pipe(map(res => res.data.articlesCollection));
	}

	public getArticleById(id: string) {
		console.log('getArticleById %s', id);
		return this.articleByIdGQL
			.watch(
				{
					filter: {
						_id: id
					}
				},
				{
					fetchPolicy: CACHED_POLICY
				}
			)
			.valueChanges.pipe(
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

		this.articleByIdGQL
			.watch(
				{
					filter: {
						_id: id
					}
				},
				{
					fetchPolicy: CACHE_AND_UPDATE_POLICY
				}
			)
			.valueChanges.subscribe();
	}
}
