import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SliderConfigSingletonGQLResponse {
	sliderConfigSingleton: {
		loopEnabled: boolean;
		sliderAutoplaySpeedMobile: string;
		sliderAutoplaySpeedDesktop: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class SliderConfigSingletonGQL extends Query<SliderConfigSingletonGQLResponse> {
	document = gql`
		query SliderConfigSingletonQuery {
			sliderConfigSingleton {
				loopEnabled
				sliderAutoplaySpeedDesktop
				sliderAutoplaySpeedMobile
			}
		}
	`;
}
