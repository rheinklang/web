import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface NavigationSingletonGQLResponse {
	navigationSingleton: {
		eventsTitle: string;
		galleriesTitle: string;
		aboutTitle: string;
		ticketsTitle: string;
		contactTitle: string;
		homeTitle: string;
		sponsorsTitle: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class NavigationSingletonGQL extends Query<NavigationSingletonGQLResponse> {
	document = gql`
		query GetNavigation {
			navigationSingleton {
				eventsTitle
				galleriesTitle
				aboutTitle
				ticketsTitle
				homeTitle
				contactTitle
				sponsorsTitle
			}
		}
	`;
}
