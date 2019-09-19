import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventType } from '../types/Event';
import { PreviewImagePathOnly } from '../types/PreviewImage';

export interface EventsGQLEntry {
	slug: string;
	title: string;
	description: string;
	type: EventType;
	previewImage?: PreviewImagePathOnly;
}

export interface EventsGQLResponse {
	articlesCollection: EventsGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class EventsGQL extends Query<EventsGQLResponse> {
	public document = gql`
		query Events {
			eventsCollection {
				slug
				title
				description
				type
				previewImage {
					path
				}
			}
		}
	`;
}
