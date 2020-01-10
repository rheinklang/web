import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CACHED_POLICY } from '../config/policies';
import { SponsorsGQL } from '../queries/Sponsors.query';
import { SponsorsSingletonGQL } from '../queries/Sponsors.singleton';

@Injectable({
	providedIn: 'root'
})
export class SponsorsService {
	constructor(private sponsorsGQL: SponsorsGQL, private sponsorsSingleton: SponsorsSingletonGQL) { }

	public getSponsors() {
		return this.sponsorsGQL.watch(undefined, {
			fetchPolicy: CACHED_POLICY
		}).valueChanges.pipe(
			map(v => v.data.sponsorsCollection)
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
