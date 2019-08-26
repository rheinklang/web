import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NavigationSingletonGQL } from '../queries/Navigation.singleton';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	constructor(private navigationSingletonGQL: NavigationSingletonGQL) { }

	public getNavigationTitles() {
		return this.navigationSingletonGQL.watch(undefined, {
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(
			map(res => res.data.navigationSingleton)
		);
	}
}
