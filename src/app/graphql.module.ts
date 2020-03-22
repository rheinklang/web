import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { Storage } from '@ionic/storage';
import { environment } from '../environments/environment';
import { LogService } from './services/log.service';
import { ApolloClientOptions } from 'apollo-client';

const uri = environment.graphQLHostURL;

/**
 * Initialize basic apollo configuration for the wrapper library provider
 */
export function createApolloInitializer(httpLink: HttpLink, log: LogService) {
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

	const cache = new InMemoryCache();

	return {
		link,
		cache,
		connectToDevTools: true,
		queryDeduplication: false,
	};
}

/**
 * Ensure that the cache was persistet before the application starts
 * by using the core initializer provider.
 */
export function mountPersistentCache(opts: ApolloClientOptions<any>, storage: Storage) {
	return async () =>
		await persistCache({
			cache: opts.cache,
			key: 'rk-gql-cache',
			storage: {
				setItem: (key, data) => storage.set(key, data),
				getItem: (key) => storage.get(key),
				removeItem: (key) => storage.remove(key),
			},
			trigger: 'background',
		});
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: mountPersistentCache,
			multi: true,
			deps: [APOLLO_OPTIONS, Storage],
		},
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApolloInitializer,
			deps: [HttpLink, LogService],
		},
	],
})
export class GraphQLModule {}
