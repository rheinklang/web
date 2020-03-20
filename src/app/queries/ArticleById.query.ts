import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImageWithColors } from '../types/PreviewImage';

export interface ArticleGQLEntry {
	_id: string;
	title: string;
	author: string;
	content: string;
	tags: string[];
	slug: string;
	releaseDate?: string;
	previewImage?: PreviewImageWithColors;
}

export interface ArticleByIDGQLResponse {
	articlesCollection: ArticleGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class ArticleByIdGQL extends Query<
	ArticleByIDGQLResponse,
	{
		filter: {
			_id?: string;
			slug?: string;
		};
	}
> {
	document = gql`
		query GetArticleById($filter: JsonType!) {
			articlesCollection(filter: $filter) {
				slug
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
