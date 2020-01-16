import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { EventSchema } from '../schema/EventSchema';
import { LocationSchema } from '../schema/LocationSchema';
import { TicketsSchema } from '../schema/TicketsSchema';

export type EventBySlugGQLEntry = EventSchema<
	Pick<LocationSchema,
		'city' |
		'canton' |
		'country' |
		'zoomLevel' |
		'googleMapsURL'>,
	Pick<TicketsSchema,
		'title' |
		'enabled' |
		'externalShopLink' |
		'externalShopType'
	>
>;

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
					zoomLevel
					googleMapsURL
				}
			}
		}
	`;
}
