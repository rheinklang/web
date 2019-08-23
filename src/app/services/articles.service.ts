import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AllArticlesQueryResponse, ALL_ARTICLES_QUERY } from '../queries/articles';

@Injectable({
	providedIn: 'root'
})
export class ArticlesService {
	constructor(private apollo: Apollo) { }

	public getArticles() {
		return this.apollo.watchQuery<AllArticlesQueryResponse>({
			query: ALL_ARTICLES_QUERY
		}).valueChanges;
	}
}
