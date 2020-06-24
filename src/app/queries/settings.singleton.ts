import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

export interface SettingsSingletonGQLResponse {
	settingsPageSingleton: {
		title: string;
		description: string;
		settingsPushLabel: string;
		settingsPushHint: string;
		settingsNewsletterLabel: string;
		settingsNewsletterHint: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class SettingsSingletonGQL extends Query<SettingsSingletonGQLResponse> {
	document = gql`
		query GetSettingsSingleton {
			settingsPageSingleton {
				title
				description
				settingsPushLabel
				settingsPushHint
				settingsNewsletterLabel
				settingsNewsletterHint
			}
		}
	`;
}
