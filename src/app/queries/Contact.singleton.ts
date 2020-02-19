import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface ContactSingletonGQLResponse {
	contactsPageSingleton: {
		title: string;
		description: string;
		guestAppearanceSubmissionEnabled: boolean;
		noGuestAppearanceSubmissionText: string;
		supplierSubmissionEnabled: boolean;
		noSupplierSubmissionText: string;
		teamSubmissionEnabled: boolean;
		noTeamSubmissionText: string;
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
				guestAppearanceSubmissionEnabled
				noGuestAppearanceSubmissionText
				supplierSubmissionEnabled
				noSupplierSubmissionText
				teamSubmissionEnabled
				noTeamSubmissionText
			}
		}
	`;
}
