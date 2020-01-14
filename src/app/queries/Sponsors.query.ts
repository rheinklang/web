import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { CockpitImageSchema } from '../schema/CockpitImageSchema';
import { SponsorLevelType } from '../types/Sponsor';

export interface SponsorGQLEntry {
	slug: string;
	name: string;
	url: string;
	logo: CockpitImageSchema;
	description?: string;
	sortWeight: string | null;
	level?: SponsorLevelType;
	lastActiveYear: string | null;
	joinedYear: string | null;
}

export interface SponsorsGQLResponse {
	sponsorsCollection: SponsorGQLEntry[];
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
