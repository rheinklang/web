import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { ImpressionSchema } from '../schema/ImpressionSchema';

export interface ImpressionBySlugGQLResponse {
	impressionsCollection: ImpressionSchema[];
}

@Injectable({
	providedIn: 'root'
})
export class ImpressionBySlugGQL extends Query<
	ImpressionBySlugGQLResponse,
	{
		filter: {
			slug: string;
		};
	}
> {
	public document = gql`
		query ImpressionBySlugQuery($filter: JsonType!) {
			impressionsCollection(filter: $filter, populate: 1) {
				description
				slug
				title
				images {
					value
				}
			}
		}
	`;
}
