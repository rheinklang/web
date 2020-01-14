import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventType } from '../types/Event';
import { PreviewImagePathOnly } from '../types/PreviewImage';
import { Injectable } from '@angular/core';

export interface EventBySlugGQLEntry {
	slug: string;
	title: string;
	date: string;
	description: string;
	facebookUrl: string;
	tickets: {
		title: string | null;
		enabled: boolean | null;
		externalShopLink: string | null;
		externalShopType: string | null;
	};
	location: {
		name: string | null;
		city: string | null;
		canton: string | null;
		country: string | null;
		googleMapsURL: string | null;
	};
	type: EventType;
	previewImage: PreviewImagePathOnly;
}

export interface EventBySlugGQLResponse {
	eventsCollection: EventBySlugGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class EventBySlugGQL extends Query<
	EventBySlugGQLResponse,
	{
		filter: {
			slug: string;
		};
	}
> {
	public document = gql`
		query EventBySlugQuery($filter: JsonType!) {
			eventsCollection(filter: $filter, populate: 1) {
				slug
				title
				date
				description
				type
				facebookUrl
				previewImage {
					path
				}
				tickets {
					title
					enabled
					externalShopLink
					externalShopType
				}
				location {
					city
					canton
					country
					googleMapsURL
				}
			}
		}
	`;
}
