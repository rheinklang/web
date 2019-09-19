import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PortraitSingletonGQL } from '../queries/Portrait.singleton';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class PortraitService {
	constructor(private portraitSingletonGQL: PortraitSingletonGQL) { }

	public getPortrait() {
		return this.portraitSingletonGQL.watch(undefined, {
			fetchPolicy: CACHED_POLICY
		}).valueChanges.pipe(
			map(res => res.data.portraitPageSingleton)
		);
	}
}
