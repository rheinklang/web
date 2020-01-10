import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CACHED_POLICY } from '../config/policies';
import { SponsorsGQL } from '../queries/Sponsors.query';
import { SponsorsSingletonGQL } from '../queries/Sponsors.singleton';
import { CockpitImageSchema } from '../schema/CockpitImageSchema';
import { SponsorLevelType, SponsorLevel } from '../types/Sponsor';
import { Observable } from 'rxjs';

export interface SponsorsServiceEntry {
	slug: string;
	name: string;
	url: string;
	logo: CockpitImageSchema;
	description: string;
	sortWeight: number;
	level: SponsorLevelType;
	lastActiveYear: string | null;
	joinedYear: string | null;
}

@Injectable({
	providedIn: 'root'
})
export class SponsorsService {
	constructor(private sponsorsGQL: SponsorsGQL, private sponsorsSingleton: SponsorsSingletonGQL) { }

	public getSponsors(): Observable<SponsorsServiceEntry[]> {
		return this.sponsorsGQL.watch(undefined, {
			fetchPolicy: CACHED_POLICY
		}).valueChanges.pipe(
			map(v => v.data.sponsorsCollection),
			map(entries => entries.map(entry => ({
				...entry,
				level: `${entry.level}` as SponsorLevel,
				description: `${entry.description}`,
				sortWeight: entry.sortWeight ? parseInt(entry.sortWeight || '0', 10) : 0
			})))
		);
	}

	public getSingleton() {
		return this.sponsorsSingleton.watch(undefined, {
			fetchPolicy: CACHED_POLICY
		}).valueChanges.pipe(
			map(v => v.data.sponsorsPageSingleton)
		);
	}
}
