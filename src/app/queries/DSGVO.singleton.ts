import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface DSGVOSingletonGQLResponse {
	dsgvoSingleton: {
		content: string;
		bannerText: string;
		bannerLinkText: string;
		id: string;
	};
}

@Injectable({
	providedIn: 'root'
})
export class DSGVOSingletonGQL extends Query<DSGVOSingletonGQLResponse> {
	document = gql`
		query DSGVOSingleton {
			dsgvoSingleton {
				id
				content
				bannerText
				bannerLinkText
			}
		}
	`;
}
