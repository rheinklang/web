import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { SponsorSchema } from '../schema/SponsorSchema';
import { ImagePathOnlySchema } from '../schema/ImageSchema';

export interface SponsorsGQLResponse {
	sponsorsCollection: SponsorSchema<ImagePathOnlySchema>[];
}

@Injectable({
	providedIn: 'root'
})
export class SponsorsGQL extends Query<SponsorsGQLResponse> {
	public document = gql`
		query SponsorsQuery {
			sponsorsCollection(filter: { enabled: true }) {
				name
				logo {
					path
				}
				url
				sortWeight
				level
				lastActiveYear
				joinedYear
			}
		}
	`;
}
