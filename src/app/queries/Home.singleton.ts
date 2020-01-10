import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { PreviewImage } from '../types/PreviewImage';
import { CockpitImageSchema } from '../schema/CockpitImageSchema';

export interface HomeSingletonGQLSlideItem {
	title: string;
	content: string;
	image: PreviewImage;
	ctaText?: string;
	ctaLink?: string;
}

export interface HomeSingletonGQLResponse {
	homePageSingleton: {
		slides: Array<{
			value: HomeSingletonGQLSlideItem,
			__typename: 'RepeaterItemSlides'
		}>
		showcaseEvent: null | {
			slug: string;
			title: string;
			description: string;
			date: string;
			previewImage: CockpitImageSchema;
			facebookUrl: string | null;
		}
	};
}

@Injectable({
	providedIn: 'root'
})
export class HomeSingletonGQL extends Query<HomeSingletonGQLResponse> {
	document = gql`
		query GetHomeSingleton {
			homePageSingleton(populate:1) {
				slides {
					value
				}
				showcaseEvent {
					slug
					title
					description
					date
					previewImage
					facebookUrl
				}
			}
		}
		`;
}
