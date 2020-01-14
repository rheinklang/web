import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventType } from '../types/Event';
import { PreviewImagePathOnly } from '../types/PreviewImage';

export interface EventsGQLEntry {
	slug: string;
	title: string;
	date: string;
	description: string;
	type: EventType;
	previewImage?: PreviewImagePathOnly;
	secret: boolean | null;
	link: string;
	linkType: 'internal' | 'external';
	facebookUrl: string;
	tickets: {
		title: string | null;
		enabled: boolean | null;
	};
	location: {
		name: string | null;
		city: string | null;
		country: string | null;
	};
}

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
