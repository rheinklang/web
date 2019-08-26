import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PortraitSingletonGQL } from '../queries/Portrait.singleton';

@Injectable({
	providedIn: 'root'
})
export class PortraitService {
	constructor(private portraitSingletonGQL: PortraitSingletonGQL) { }

	public getPortrait() {
		return this.portraitSingletonGQL.watch(undefined, {
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(
			map(res => res.data.portraitPageSingleton)
		);
	}
}
