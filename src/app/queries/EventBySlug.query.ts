import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { EventType } from '../types/Event';
import { PreviewImagePathOnly } from '../types/PreviewImage';
import { Injectable } from '@angular/core';

export interface EventBySlugEntry {
	slug: string;
	title: string;
	date: string;
	description: string;
	tickets: {
		_id: string | null;
	};
	impression: {
		_id: string | null;
	};
	location: {
		_id: string | null;
	};
	type: EventType;
	previewImage: PreviewImagePathOnly;
}

export interface EventBySlugGQLResponse {
	eventsCollection: EventBySlugEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class EventBySlugGQL extends Query<EventBySlugGQLResponse, {
	filter: {
		slug: string
	}
}> {
	public document = gql`
		query EventBySlug($filter: JsonType!) {
			eventsCollection(filter: $filter) {
				slug
				title
				description
				type
				previewImage {
					path
				}
				impression {
					_id
				}
				tickets {
					_id
				}
				location {
					_id
				}
			}
		}
	`;
}
