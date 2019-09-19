import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { PreviewImage } from '../types/PreviewImage';

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
	};
}

@Injectable({
	providedIn: 'root'
})
export class HomeSingletonGQL extends Query<HomeSingletonGQLResponse> {
	document = gql`
		query GetHomeSingleton {
			homePageSingleton {
				slides {
					value
				}
			}
		}
		`;
}
