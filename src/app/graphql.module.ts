import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';

const uri = environment.graphQLHostURL;

console.log('Using GraphQL Host ' + uri);

export function createApollo(httpLink: HttpLink) {
	return {
		connectToDevTools: true,
		queryDeduplication: true,
		link: httpLink.create({ uri }),
		cache: new InMemoryCache()
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink]
		}
	]
})
export class GraphQLModule { }
