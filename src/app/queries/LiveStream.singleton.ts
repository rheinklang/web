import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { LiveStreamSchema } from '../schema/LiveStreamSchema';

export interface LiveStreamGQLResponse {
	livestreamSingleton: LiveStreamSchema;
}

@Injectable({
	providedIn: 'root'
})
export class LiveStreamGQL extends Query<LiveStreamGQLResponse> {
	document = gql`
		query GetLiveStream {
			livestreamSingleton {
				enabled
				startDate
				startTime
				duration
				channel
			}
		}
	`;
}
