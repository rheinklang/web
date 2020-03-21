import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImagePathOnly } from '../types/PreviewImage';

export interface ArticlesGQLEntry {
	_id: string;
	title: string;
	author: string;
	slug: string;
	excerpt: string;
	tags: string[];
	releaseDate?: string;
	previewImage?: PreviewImagePathOnly;
}

export interface ArticlesGQLResponse {
	articlesCollection: ArticlesGQLEntry[];
}

@Injectable({
	providedIn: 'root',
})
export class ArticlesGQL extends Query<ArticlesGQLResponse> {
	document = gql`
		query GetArticles {
			articlesCollection {
				_id
				slug
				title
				author
				excerpt
				tags
				releaseDate
				previewImage {
					path
				}
			}
		}
	`;
}
