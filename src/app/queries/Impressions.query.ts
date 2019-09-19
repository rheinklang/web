import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImagePathOnly, PreviewImage } from '../types/PreviewImage';

export interface ImpressionsGQLEntry {
	title: string;
	showcaseImage: PreviewImagePathOnly;
}

export interface ImpressionsGQLResponse {
	impressionsCollection: ImpressionsGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class ImpressionsGQL extends Query<ImpressionsGQLResponse> {
	document = gql`
		query GetImpressionById($filter: JsonType!) {
			impressionsCollection impressionsCollection {
				title
				showcaseImage {
					path
				}
			}
		}
		`;
}
