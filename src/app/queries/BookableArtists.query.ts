import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { RawBookableArtistSchema } from '../schema/BookableArtistSchema';

export interface BookableArtistsGQLResponse {
	bookableArtistsCollection: RawBookableArtistSchema[];
}

@Injectable({
	providedIn: 'root'
})
export class BookableArtistsGQL extends Query<BookableArtistsGQLResponse> {
	document = gql`
		query GetBookableArtists {
			bookableArtistsCollection {
				name
				agency
				live
				genre
				labels
				wage
				bookingFee
				flights
				flightDepartureLocation
				totalFlightCost
				hotelAmount
				transferAmount
				mealAmount
				subtotalEUR
				subtotalCHF
				total
			}
		}
	`;
}
