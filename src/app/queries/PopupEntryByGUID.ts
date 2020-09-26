import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { ImpressionSchema } from '../schema/ImpressionSchema';
import { IPopupEntrySchema } from '../schema/PopupEntrySchema';

export interface PopupEntryByGUIDGQLResponse {
	popupHeerbruggGuestsCollection: IPopupEntrySchema[];
}

@Injectable({
	providedIn: 'root',
})
export class PopupEntryByGUIDGQL extends Query<
	PopupEntryByGUIDGQLResponse,
	{
		filter: {
			guid: string;
		};
	}
> {
	public document = gql`
		query PopupEntryByGUID($filter: JsonType!) {
			popupHeerbruggGuestsCollection(filter: $filter) {
				surname
				lastname
				guid
				eventId
			}
		}
	`;
}
