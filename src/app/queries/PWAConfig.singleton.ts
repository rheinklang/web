import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface PWAConfigSingletonGQLResponse {
	pwaConfigSingleton: {
		cacheVersion: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class PWAConfigSingletonGQL extends Query<PWAConfigSingletonGQLResponse> {
	document = gql`
		query PWAConfigSingletonQuery {
			pwaConfigSingleton {
				cacheVersion
			}
		}
	`;
}
