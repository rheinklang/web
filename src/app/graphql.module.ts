import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { ErrorLogService } from './services/error-log.service';

const uri = environment.graphQLHostURL;

console.log('Using GraphQL Host ' + uri);

export function createApollo(httpLink: HttpLink, errorLogService: ErrorLogService) {
	const link = httpLink.create({ uri });

	onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message, locations, path, source }) =>
				errorLogService.trace({
					module: `GraphGQLModule(${source.name || 'Unknown'})`,
					message: `${message} (location: ${locations}, path: ${path})`
				})
			);
		}

		if (networkError) {
			errorLogService.traceError('GraphGQLModule', networkError);
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
			deps: [HttpLink, ErrorLogService]
		}
	]
})
export class GraphQLModule {}
