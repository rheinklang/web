import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CacheConfigSingletonGQL, CacheConfigSingletonGQLResponse } from '../queries/CacheConfig.singleton';
import { ApolloConfigSingletonGQL, ApolloConfigSingletonGQLResponse } from '../queries/ApolloConfig.singleton';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	private prefetchedApolloConfig?: ApolloConfigSingletonGQLResponse['apolloConfigSingleton'];
	private prefetchedCacheConfig?: CacheConfigSingletonGQLResponse['cacheConfigSingleton'];

	constructor(private cacheConfigGQL: CacheConfigSingletonGQL, private apolloConfigGQL: ApolloConfigSingletonGQL) {}

	public getApolloConfig(): ApolloConfigSingletonGQLResponse['apolloConfigSingleton'] {
		return (
			this.prefetchedApolloConfig || {
				fetchPolicy: 'network-only',
				watchPolicy: 'cache-and-network',
				errorPolicy: 'ignore',
			}
		);
	}

	public getCacheConfig(): CacheConfigSingletonGQLResponse['cacheConfigSingleton'] {
		return (
			this.prefetchedCacheConfig || {
				dataSchemaVersion: 'initial',
				databaseKey: 'rk-gql-cache',
				persistCacheTrigger: 'write',
			}
		);
	}

	public fetchCacheConfig() {
		return this.cacheConfigGQL.fetch().pipe(map((res) => res.data.cacheConfigSingleton));
	}

	public fetchApolloConfig() {
		return this.apolloConfigGQL.fetch().pipe(map((res) => res.data.apolloConfigSingleton));
	}
}
