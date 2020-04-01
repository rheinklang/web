import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClientOptions } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { Storage } from '@ionic/storage';
import { environment } from '../environments/environment';
import { ICockpitGenericField } from './schema/CockpitField';
import { LogService } from './services/log.service';
import { ConfigService } from './services/config.service';
import { cacheResolver } from './graphql.cacheRedirects';

const uri = environment.graphQLHostURL;

/**
 * Initialize basic apollo configuration for the wrapper library provider
 */
export function createApolloInitializer(httpLink: HttpLink, log: LogService, configService: ConfigService) {
	const link = httpLink.create({ uri });

	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message, locations, path, source }) =>
				log.trace({
					module: `GraphGQLModule(${source.name || 'Unknown'})`,
					message: `${message} (location: ${locations}, path: ${path})`,
				})
			);
		}

		if (networkError) {
			log.traceError('GraphGQLModule', networkError);
		}
	});

	const cache = new InMemoryCache({
		cacheRedirects: cacheResolver,
		dataIdFromObject: (value: ICockpitGenericField) => {
			return value._id || defaultDataIdFromObject(value);
		},
	});

	const opts: ApolloClientOptions<any> = {
		link,
		cache,
		connectToDevTools: true,
		queryDeduplication: false,
	};

	return opts;
}

/**
 * Ensure that the cache was persistet before the application starts
 * by using the core initializer provider.
 */
export function mountPersistentCache(
	configService: ConfigService,
	opts: ApolloClientOptions<Record<string, any>>,
	storage: Storage,
	apollo: Apollo
) {
	return async () => {
		console.log('init', configService);
		await configService.fetchCacheConfig().toPromise();
		await configService.fetchApolloConfig().toPromise();

		const { watchPolicy, fetchPolicy, errorPolicy } = configService.getApolloConfig();
		const cacheConfig = configService.getCacheConfig();
		const schemaBasedKey = (v: string) => `${cacheConfig.dataSchemaVersion}_${v}`;

		await persistCache({
			cache: opts.cache,
			key: cacheConfig.databaseKey,
			storage: {
				setItem: (key, data) => storage.set(schemaBasedKey(key), data),
				getItem: (key) => storage.get(schemaBasedKey(key)),
				removeItem: (key) => storage.remove(schemaBasedKey(key)),
			},
			trigger: cacheConfig.persistCacheTrigger,
		});

		opts.defaultOptions = {
			query: {
				errorPolicy,
				fetchPolicy,
			},
			mutate: {
				errorPolicy,
				fetchPolicy,
			},
			watchQuery: {
				errorPolicy,
				fetchPolicy: watchPolicy,
			},
		};

		if (!environment.production) {
			// flush cache if not in production for better development state
			await apollo.getClient().resetStore();
		}
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: mountPersistentCache,
			multi: true,
			deps: [ConfigService, APOLLO_OPTIONS, Storage, Apollo],
		},
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApolloInitializer,
			deps: [HttpLink, LogService, ConfigService],
		},
	],
})
export class GraphQLModule {}
