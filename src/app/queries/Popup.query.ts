import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { IPopupEntrySchema } from '../schema/PopupEntrySchema';

export interface PopupGQLResponse {
	popupHeerbruggGuestsCollection: IPopupEntrySchema[];
}

@Injectable({
	providedIn: 'root',
})
export class PopupGQL extends Query<PopupGQLResponse> {
	public document = gql`
		query SponsorsQuery {
			popupHeerbruggGuestsCollection {
				surname
				lastname
				guid
				eventId
			}
		}
	`;
}
