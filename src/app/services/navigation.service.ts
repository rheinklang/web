import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { NavigationSingletonGQL } from '../queries/Navigation.singleton';
import { CACHE_AND_UPDATE_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	constructor(private navigationSingletonGQL: NavigationSingletonGQL) { }

	public getNavigationTitles() {
		return this.navigationSingletonGQL.watch(undefined, {
			fetchPolicy: CACHE_AND_UPDATE_POLICY
		}).valueChanges.pipe(
			filter(res => res.loading === false),
			map(res => res.data.navigationSingleton)
		);
	}
}
