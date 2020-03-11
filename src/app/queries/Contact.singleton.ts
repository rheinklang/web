import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface ContactSingletonGQLResponse {
	contactsPageSingleton: {
		title: string;
		description: string;
		guestAppearanceSubmissionTitle: string;
		guestAppearanceSubmissionEnabled: boolean;
		noGuestAppearanceSubmissionText: string;
		supplierSubmissionTitle: string;
		supplierSubmissionEnabled: boolean;
		noSupplierSubmissionText: string;
		teamSubmissionTitle: string;
		teamSubmissionEnabled: boolean;
		noTeamSubmissionText: string;
		artistBookingSubmissionTitle: string;
		artistBookingSubmissionEnabled: boolean;
		noArtistBookingSubmissionText: string;
	};
}

@Injectable({
	providedIn: 'root'
})
export class ContactSingletonGQL extends Query<ContactSingletonGQLResponse> {
	document = gql`
		query ContactSingleton {
			contactsPageSingleton {
				title
				description
				guestAppearanceSubmissionTitle
				guestAppearanceSubmissionEnabled
				noGuestAppearanceSubmissionText
				supplierSubmissionTitle
				supplierSubmissionEnabled
				noSupplierSubmissionText
				teamSubmissionTitle
				teamSubmissionEnabled
				noTeamSubmissionText
				artistBookingSubmissionTitle
				artistBookingSubmissionEnabled
				noArtistBookingSubmissionText
			}
		}
	`;
}
