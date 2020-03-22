import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { PreviewImage } from '../types/PreviewImage';
import { EventBySlugGQLEntry } from './EventBySlug.query';

export interface HomeSingletonGQLSlideItem {
	title: string;
	content: string;
	image: PreviewImage;
	ctaText?: string;
	ctaLink?: string;
	ctaLinkparams?: string; // JSON
}

export interface HomeSingletonGQLResponse {
	homePageSingleton: {
		slides: Array<{
			value: HomeSingletonGQLSlideItem;
			__typename: 'RepeaterItemSlides';
		}>;
		showcaseEvent: EventBySlugGQLEntry | null;
	};
}

@Injectable({
	providedIn: 'root',
})
export class HomeSingletonGQL extends Query<HomeSingletonGQLResponse> {
	document = gql`
		query GetHomeSingletonQuery {
			homePageSingleton(populate: 1) {
				slides {
					value
				}
				showcaseEvent {
					slug
					title
					description
					date
					type
					tickets
					previewImage
					location
					facebookUrl
				}
			}
		}
	`;
}
