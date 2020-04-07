import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface MaintenanceConfigSingletonGQLResponse {
	maintenanceConfigSingleton: {
		enabled: boolean;
		title: string;
		text: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class MaintenanceConfigSingletonGQL extends Query<MaintenanceConfigSingletonGQLResponse> {
	document = gql`
		query MaintenanceConfigSingletonQuery {
			maintenanceConfigSingleton {
				enabled
				title
				text
			}
		}
	`;
}
