import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SEOEntry {
	title: string;
	description: string;
	og_title: string;
	og_image: {
		path: string;
	};
}

export interface SEOContextGQLResponse {
	seoCollection: SEOEntry[];
}

@Injectable({
	providedIn: 'root',
})
export class SEOContextQueryGQL extends Query<
	SEOContextGQLResponse,
	{
		filter: {
			context: string;
		};
	}
> {
	document = gql`
		query GetSeoForPage($filter: JsonType!) {
			seoCollection(filter: $filter) {
				title
				description
				og_title
				og_image {
					path
				}
			}
		}
	`;
}
