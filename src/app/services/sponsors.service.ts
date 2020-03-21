import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CACHED_POLICY } from '../config/policies';
import { SponsorsGQL } from '../queries/Sponsors.query';
import { SponsorsSingletonGQL } from '../queries/Sponsors.singleton';
import { SponsorLevel } from '../types/Sponsor';
import { Observable } from 'rxjs';
import { SponsorSchema } from '../schema/SponsorSchema';
import { ImagePathOnlySchema } from '../schema/ImageSchema';
import { Without } from '../types/generics';

export type SponsorsServiceEntry = Without<SponsorSchema<ImagePathOnlySchema>, 'sortWeight'> & {
	ariaLabel: string;
	sortWeight: number;
};

@Injectable({
	providedIn: 'root',
})
export class SponsorsService {
	constructor(private sponsorsGQL: SponsorsGQL, private sponsorsSingleton: SponsorsSingletonGQL) {}

	public getSponsors(): Observable<SponsorsServiceEntry[]> {
		return this.sponsorsGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(
				map((v) => v.data.sponsorsCollection),
				map((entries) =>
					entries.map(
						(entry): SponsorsServiceEntry => ({
							...entry,
							level: `${entry.level}` as SponsorLevel,
							ariaLabel: `${entry.name} ist Sponsor seit ${entry.joinedYear} (${entry.level} level)`,
							description: `${entry.description}`,
							sortWeight: parseInt(entry.sortWeight || '0', 10),
						})
					)
				)
			);
	}

	public getSingleton() {
		return this.sponsorsSingleton
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(map((v) => v.data.sponsorsPageSingleton));
	}
}
