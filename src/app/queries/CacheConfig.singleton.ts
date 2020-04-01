import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface CacheConfigSingletonGQLResponse {
	cacheConfigSingleton: {
		dataSchemaVersion: string;
		databaseKey: string;
		persistCacheTrigger: 'background' | 'write';
	};
}

@Injectable({
	providedIn: 'root',
})
export class CacheConfigSingletonGQL extends Query<CacheConfigSingletonGQLResponse> {
	document = gql`
		query CacheConfigSingletonQuery {
			cacheConfigSingleton {
				dataSchemaVersion
				databaseKey
				persistCacheTrigger
			}
		}
	`;
}
