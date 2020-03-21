import { Injectable } from '@angular/core';
import { map, flatMap, first } from 'rxjs/operators';
import { ImpressionsGQL } from '../queries/Impressions.query';
import { ImpressionByIdGQL } from '../queries/ImpressionById.query';
import { CACHED_POLICY, CACHE_AND_UPDATE_POLICY } from '../config/policies';
import { ImpressionBySlugGQL } from '../queries/ImpressionBySlug.query';

@Injectable({
	providedIn: 'root',
})
export class ImpressionsService {
	private preloadedImpressions: string[] = [];

	constructor(private impressionsGQL: ImpressionsGQL, private impressionBySlugGQL: ImpressionBySlugGQL) {}

	public getImpressions() {
		return this.impressionsGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(map((v) => v.data.impressionsCollection));
	}

	public getImpressionBySlug(slug: string) {
		return this.impressionBySlugGQL
			.watch(
				{
					filter: { slug },
				},
				{
					fetchPolicy: CACHED_POLICY,
				}
			)
			.valueChanges.pipe(
				map((res) => res.data.impressionsCollection),
				flatMap((entry) => entry),
				first()
			);
	}

	public preloadImpressionBySlug(slug: string) {
		if (this.preloadedImpressions.indexOf(slug) > -1) {
			return;
		}

		this.preloadedImpressions.push(slug);

		return this.impressionBySlugGQL
			.watch(
				{
					filter: { slug },
				},
				{
					fetchPolicy: CACHE_AND_UPDATE_POLICY,
				}
			)
			.valueChanges.subscribe();
	}
}
