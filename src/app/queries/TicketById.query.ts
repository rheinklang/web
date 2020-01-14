import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImagePathOnly } from '../types/PreviewImage';

export interface TicketByIdGQLEntry {
	title: string;
	paymentInfo: string;
	previewImage: PreviewImagePathOnly;
	enabled: boolean;
	embeddedContent: string; // HTML
	startDate: string; // YYYY-MM-DD
	startTime: string; // HH:mm
	endDate: string; // YYYY-MM-DD
	endTime: string; // HH:mm
}

export interface TicketByIdGQLResponse {
	ticketshopsCollection: TicketByIdGQLEntry[];
}

@Injectable({
	providedIn: 'root'
})
export class TicketByIdGQL extends Query<
	TicketByIdGQLResponse,
	{
		filter: {
			_id: string;
		};
	}
> {
	document = gql`
		query GetTicketByIdQuery($filter: JsonType!) {
			ticketshopsCollection(filter: $filter) {
				title
				paymentInfo
				previewImage {
					path
				}
				embeddedContent
				enabled
				startDate
				startTime
				endDate
				endTime
			}
		}
	`;
}
