import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { TeamSchema } from '../schema/TeamSchema';

export interface TeamGQLResponse {
	teamCollection: TeamSchema[];
}

@Injectable({
	providedIn: 'root',
})
export class TeamGQL extends Query<TeamGQLResponse> {
	document = gql`
		query GetTeamQuery {
			teamCollection(sort: { founder: true, lead: true, fullName: "asc" }) {
				_id
				fullName
				image {
					path
				}
				description
				lead
				founder
				mainRole
				sideRole
			}
		}
	`;
}
