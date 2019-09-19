import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImagePathOnly } from '../types/PreviewImage';

export interface PortraitSingletonGQLResult {
	portraitPageSingleton: {
		groupPortraitImage: PreviewImagePathOnly;
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
