import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { LocationSchema } from '../schema/LocationSchema';

export interface LocationByIdGQLResponse {
	locationsCollection: LocationSchema[];
}

@Injectable({
	providedIn: 'root',
})
export class LocationByIdGQL extends Query<
	LocationByIdGQLResponse,
	{
		filter: {
			_id: string;
		};
	}
> {
	document = gql`
		query GetLocationById($filter: JsonType!) {
			locationsCollection(filter: $filter) {
				name
				city
				canton
				country
				openLayersURL
				googleMapsURL
			}
		}
	`;
}
