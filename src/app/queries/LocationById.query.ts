import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface LocationByIdGQLEntry {
	name: string;
	city: string;
	canton: string;
	country: string;
	openLayersURL: string;
	googleMapsURL: string;
}

export interface LocationByIdGQLResponse {
	locationsCollection: LocationByIdGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class LocationByIdGQL extends Query<LocationByIdGQLResponse, {
	filter: {
		_id: string
	}
}> {
	document = gql`
		query GetLocationById($filter: JsonType!) {
			locationsCollection {
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
