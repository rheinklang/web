import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { CockpitOptionalField, CockpitRequiredField } from '../schema/CockpitField';

export interface SEOEntry {
	title: CockpitRequiredField<string>;
	description: CockpitRequiredField<string>;
	keywords: CockpitOptionalField<string[]>;
	og_title: CockpitOptionalField<string>;
	og_image: CockpitOptionalField<{
		path: string;
	}>;
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
				keywords
				og_title
				og_image {
					path
				}
			}
		}
	`;
}
