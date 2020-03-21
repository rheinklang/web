import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { RawBookableArtistSchema } from '../schema/BookableArtistSchema';

export type BookableArtistsForDropdownGQLEntry = Pick<
	RawBookableArtistSchema,
	| 'flights'
	| 'flightDepartureLocation'
	| 'name'
	| 'agency'
	| 'genre'
	| 'labels'
	| 'live'
	| 'transferAmount'
	| 'hotelAmount'
	| 'mealAmount'
> & {
	flights: number;
	transferAmount: number;
	hotelAmount: number;
	mealAmount: number;
};

export interface BookableArtistsForDropdownGQLResponse {
	bookableArtistsCollection: BookableArtistsForDropdownGQLEntry[];
}

@Injectable({
	providedIn: 'root',
})
export class BookableArtistsForDropdownGQL extends Query<BookableArtistsForDropdownGQLResponse> {
	document = gql`
		query GetBookableArtistsForDropdown {
			bookableArtistsCollection {
				flights
				flightDepartureLocation
				name
				agency
				genre
				labels
				live
				transferAmount
				hotelAmount
				mealAmount
			}
		}
	`;
}
