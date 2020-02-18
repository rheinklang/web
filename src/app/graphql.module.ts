import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { LogService } from './services/log.service';

const uri = environment.graphQLHostURL;

export function createApollo(httpLink: HttpLink, log: LogService) {
	const link = httpLink.create({ uri });

	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message, locations, path, source }) =>
				log.trace({
					module: `GraphGQLModule(${source.name || 'Unknown'})`,
					message: `${message} (location: ${locations}, path: ${path})`
				})
			);
		}

		if (networkError) {
			log.traceError('GraphGQLModule', networkError);
		}
	});

	return {
		link,
		connectToDevTools: true,
		queryDeduplication: false,
		cache: new InMemoryCache()
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink, LogService]
		}
	]
})
export class GraphQLModule {}
