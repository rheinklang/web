import { Injectable } from '@angular/core';
import { map, flatMap, first } from 'rxjs/operators';
import { LocationByIdGQL } from '../queries/LocationById.query';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class LocationsService {
	constructor(private locationByIdGQL: LocationByIdGQL) { }

	public getLocationById(id: string) {
		return this.locationByIdGQL
			.watch(
				{
					filter: { _id: id }
				},
				{
					fetchPolicy: CACHED_POLICY
				}
			)
			.valueChanges
			.pipe(
				map(res => res.data.locationsCollection),
				flatMap(entry => entry),
				first()
			);
	}
}
