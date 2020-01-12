import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface EventsSingletonGQLResponse {
	eventsPageSingleton: {
		title: string;
		description: string;
	};
}

@Injectable({
	providedIn: 'root'
})
export class EventsSingletonGQL extends Query<EventsSingletonGQLResponse> {
	document = gql`
		query EventsSingleton {
			eventsPageSingleton {
				title
				description
			}
		}
	`;
}
