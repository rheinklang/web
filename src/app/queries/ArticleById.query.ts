import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface ArticleGQLEntry {
	_id: string;
	title: string;
	author: string;
	content: string;
	tags: string[];
	releaseDate?: string;
	previewImage?: {
		path: string;
		colors: string[]
	};
}

export interface ArticleByIDGQLResponse {
	articlesCollection: ArticleGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class ArticleByIdGQL extends Query<ArticleByIDGQLResponse, {
	filter: {
		_id: string
	}
}> {
	document = gql`
		query GetArticleById($filter: JsonType!) {
			articlesCollection(filter: $filter) {
				title
				author
				content
				tags
				releaseDate
				previewImage {
					path
				}
			}
		}
		`;
}
