import { Injectable } from '@angular/core';
import { map, flatMap, first } from 'rxjs/operators';
import { ImpressionsGQL } from '../queries/Impressions.query';
import { ImpressionByIdGQL } from '../queries/ImpressionById.query';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class ImpressionsService {
	constructor(
		private impressionsGQL: ImpressionsGQL,
		private impressionByIdGQL: ImpressionByIdGQL
	) {}

	public getImpressions() {
		return this.impressionsGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY
			})
			.valueChanges.pipe(map(v => v.data.impressionsCollection));
	}

	public getImpressionById(id: string) {
		return this.impressionByIdGQL
			.watch(
				{
					filter: { _id: id }
				},
				{
					fetchPolicy: CACHED_POLICY
				}
			)
			.valueChanges.pipe(
				map(res => res.data.impressionsCollection),
				flatMap(entry => entry),
				first()
			);
	}
}
