import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SponsorsSingletonGQLResponse {
	sponsorsPageSingleton: {
		title: string;
		description: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class SponsorsSingletonGQL extends Query<SponsorsSingletonGQLResponse> {
	document = gql`
		query SponsorsSingleton {
			sponsorsPageSingleton {
				title
				description
			}
		}
	`;
}
