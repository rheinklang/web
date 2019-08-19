import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NavigationQueryResponse, getNavigationQuery } from '../queries/navigation-singleton';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	constructor(private apollo: Apollo) { }

	public getNavigationTitles() {
		return this.apollo.watchQuery<NavigationQueryResponse>({
			query: getNavigationQuery()
		}).valueChanges;
	}
}
