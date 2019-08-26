import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface PortraitSingletonGQLResult {
	portraitPageSingleton: {
		groupPortraitImage: {
			path: string;
		};
		groupPortraitDescription: string;
		visibleMemberList: { _id: string }[];
	};
}

@Injectable({
	providedIn: 'root'
})
export class PortraitSingletonGQL extends Query<PortraitSingletonGQLResult> {
	document = gql`
		query GetPortrait {
			portraitPageSingleton {
				groupPortraitImage {
					path
				}
				groupPortraitDescription
				visibleMemberList {
					_id
				}
			}
		}
		`;
}
