import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { tryParse } from '../utils/number';
import { CACHE_AND_UPDATE_POLICY } from '../config/policies';
import { BookableArtistsGQL } from '../queries/BookableArtists.query';
import {
	BookableArtistsForDropdownGQL,
	BookableArtistsForDropdownGQLEntry
} from '../queries/BookableArtistsForDropdown.query';

export type BookableArtistsForDropdown = Pick<
	BookableArtistsForDropdownGQLEntry,
	'flightDepartureLocation' | 'name' | 'agency' | 'genre' | 'labels' | 'live'
> & {
	flights: number;
	transferAmount: number;
	hotelAmount: number;
	mealAmount: number;
};

@Injectable({
	providedIn: 'root'
})
export class ArtistsService {
	constructor(
		private bookableArtistsGQL: BookableArtistsGQL,
		private bookableArtistsForDropdownGQL: BookableArtistsForDropdownGQL
	) {}

	/**
	 * Get the full list of bookable artists
	 * @internal
	 */
	public getBookableArtists() {
		return this.bookableArtistsGQL
			.watch(undefined, {
				fetchPolicy: CACHE_AND_UPDATE_POLICY
			})
			.valueChanges.pipe(
				map(res => res.data.bookableArtistsCollection),
				map(entries =>
					entries.map(entry => ({
						...entry,
						wage: tryParse(entry.wage, 'float'),
						bookingFee: tryParse(entry.bookingFee, 'float'),
						flights: tryParse(entry.flights),
						totalFlightCost: tryParse(entry.flights, 'float'),
						hotelAmount: tryParse(entry.flights),
						transferAmount: tryParse(entry.transferAmount),
						mealAmount: tryParse(entry.mealAmount),
						subtotalEUR: tryParse(entry.subtotalEUR, 'float'),
						subtotalCHF: tryParse(entry.subtotalCHF, 'float'),
						total: tryParse(entry.total, 'float')
					}))
				)
			);
	}

	/**
	 * Get a displayable list of artists and only fetch public
	 * information
	 */
	public getBookableArtistsDropdownList() {
		return this.bookableArtistsForDropdownGQL.watch().valueChanges.pipe(
			map(res => res.data.bookableArtistsCollection),
			map(entries =>
				entries.map(
					(entry): BookableArtistsForDropdown => ({
						...entry,
						flights: tryParse(entry.flights),
						hotelAmount: tryParse(entry.hotelAmount),
						mealAmount: tryParse(entry.mealAmount),
						transferAmount: tryParse(entry.transferAmount)
					})
				)
			)
		);
	}
}
