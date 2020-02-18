import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CACHED_POLICY, CACHE_AND_UPDATE_POLICY } from '../config/policies';
import { SponsorsGQL } from '../queries/Sponsors.query';
import { SponsorsSingletonGQL } from '../queries/Sponsors.singleton';
import { SponsorLevel } from '../types/Sponsor';
import { Observable } from 'rxjs';
import { SponsorSchema } from '../schema/SponsorSchema';
import { ImagePathOnlySchema } from '../schema/ImageSchema';
import { Without } from '../types/generics';
import { ContactSingletonGQL } from '../queries/Contact.singleton';

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	constructor(private contactSingletonGQL: ContactSingletonGQL) {}

	public getSingleton() {
		return this.contactSingletonGQL
			.watch(undefined, {
				// fetchPolicy: CACHE_AND_UPDATE_POLICY
			})
			.valueChanges.pipe(map(res => res.data.contactsPageSingleton));
	}
}
