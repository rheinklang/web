import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { WatchQueryFetchPolicy, FetchPolicy, ErrorPolicy } from 'apollo-client';

export interface ApolloConfigSingletonGQLResponse {
	apolloConfigSingleton: {
		watchPolicy: WatchQueryFetchPolicy;
		fetchPolicy: FetchPolicy;
		errorPolicy: ErrorPolicy;
	};
}

@Injectable({
	providedIn: 'root',
})
export class ApolloConfigSingletonGQL extends Query<ApolloConfigSingletonGQLResponse> {
	document = gql`
		query ApolloConfigSingletonQuery {
			apolloConfigSingleton {
				fetchPolicy
				watchPolicy
				errorPolicy
			}
		}
	`;
}
