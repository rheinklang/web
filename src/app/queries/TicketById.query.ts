import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { TicketsSchema } from '../schema/TicketsSchema';

export interface TicketByIdGQLResponse {
	ticketshopsCollection: TicketsSchema[];
}

@Injectable({
	providedIn: 'root',
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
