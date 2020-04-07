import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CacheConfigSingletonGQL, CacheConfigSingletonGQLResponse } from '../queries/CacheConfig.singleton';
import { ApolloConfigSingletonGQL, ApolloConfigSingletonGQLResponse } from '../queries/ApolloConfig.singleton';
import {
	MaintenanceConfigSingletonGQLResponse,
	MaintenanceConfigSingletonGQL,
} from 'app/queries/MaintenanceConfig.singleton';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	private prefetchedApolloConfig?: ApolloConfigSingletonGQLResponse['apolloConfigSingleton'];
	private prefetchedCacheConfig?: CacheConfigSingletonGQLResponse['cacheConfigSingleton'];
	private prefetchedMaintenanceConfig?: MaintenanceConfigSingletonGQLResponse['maintenanceConfigSingleton'];

	constructor(
		private cacheConfigGQL: CacheConfigSingletonGQL,
		private apolloConfigGQL: ApolloConfigSingletonGQL,
		private maintenanceConfigGQL: MaintenanceConfigSingletonGQL
	) {}

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

	public getMaintenanceConfig(): MaintenanceConfigSingletonGQLResponse['maintenanceConfigSingleton'] {
		return (
			this.prefetchedMaintenanceConfig || {
				enabled: false,
				title: 'Wir sind bald wieder für Sie da.',
				text: 'Wartungsarbeiten',
			}
		);
	}

	public fetchCacheConfig() {
		return new Promise((resolve) =>
			this.cacheConfigGQL
				.fetch()
				.pipe(map((res) => res.data.cacheConfigSingleton))
				.subscribe((res) => {
					this.prefetchedCacheConfig = res;
					resolve();
				})
		);
	}

	public fetchApolloConfig() {
		return new Promise((resolve) =>
			this.apolloConfigGQL
				.fetch()
				.pipe(map((res) => res.data.apolloConfigSingleton))
				.subscribe((res) => {
					this.prefetchedApolloConfig = res;
					resolve();
				})
		);
	}

	public fetchMaintenanceConfig() {
		return new Promise((resolve) =>
			this.maintenanceConfigGQL
				.fetch()
				.pipe(map((res) => res.data.maintenanceConfigSingleton))
				.subscribe((res) => {
					this.prefetchedMaintenanceConfig = res;
					resolve();
				})
		);
	}
}
