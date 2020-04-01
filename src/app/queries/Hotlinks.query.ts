import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { HotlinkSchema } from '../schema/HotlinkSchema';

export interface HotlinksGQLResponse {
	hotlinksCollection: HotlinkSchema[];
}

@Injectable({
	providedIn: 'root',
})
export class HotlinksGQL extends Query<HotlinksGQLResponse> {
	document = gql`
		query GetHotlinks {
			hotlinksCollection {
				label
				url
				category
				internal
				queryParams
			}
		}
	`;
}
