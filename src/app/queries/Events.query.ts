import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { LocationSchema } from '../schema/LocationSchema';
import { EventSchema } from '../schema/EventSchema';
import { TicketsSchema } from '../schema/TicketsSchema';

export type EventsGQLEntry = EventSchema<
	Pick<LocationSchema, 'city' | 'canton' | 'country'>,
	Pick<TicketsSchema, 'title' | 'enabled'>
>;

export interface EventsGQLResponse {
	eventsCollection: EventsGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class EventsGQL extends Query<EventsGQLResponse> {
	public document = gql`
		query GetEventsQuery {
			eventsCollection(populate: 1) {
				title
				description
				date
				link
				facebookUrl
				slug
				secret
				type
				previewImage {
					path
				}
				location {
					name
					city
					country
				}
				tickets {
					enabled
					title
				}
			}
		}
	`;
}
