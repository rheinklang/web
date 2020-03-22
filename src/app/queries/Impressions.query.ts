import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { ImageSchema } from '../schema/ImageSchema';

export interface ImpressionsGQLEntry {
	title: string;
	slug: string;
	showcaseImage: ImageSchema;
}

export interface ImpressionsGQLResponse {
	impressionsCollection: ImpressionsGQLEntry[];
}

@Injectable({
	providedIn: 'root',
})
export class ImpressionsGQL extends Query<ImpressionsGQLResponse> {
	document = gql`
		query ImpressionsQuery {
			impressionsCollection {
				title
				slug
				showcaseImage {
					path
					colors
				}
			}
		}
	`;
}
