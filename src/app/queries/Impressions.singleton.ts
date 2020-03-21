import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { LiveStreamSchema } from '../schema/LiveStreamSchema';

export interface ImpressionsSingletonGQLResponse {
	impressionsSingleton: {
		title: string;
		description: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class ImpressionsSingletonGQL extends Query<ImpressionsSingletonGQLResponse> {
	document = gql`
		query GetImpressionsSingleton {
			impressionsSingleton {
				title
				description
			}
		}
	`;
}
