import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DSGVOSingletonGQL } from '../queries/DSGVO.singleton';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root',
})
export class DSGVOService {
	constructor(private dsgvoSingletonGQL: DSGVOSingletonGQL) {}

	public getSingleton() {
		return this.dsgvoSingletonGQL.watch().valueChanges.pipe(map((res) => res.data.dsgvoSingleton));
	}
}
