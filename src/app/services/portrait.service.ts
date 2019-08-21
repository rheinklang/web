import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetPortraitPageQueryResult, getPortraitPageQuery } from '../queries/portrait-page-singleton';

@Injectable({
	providedIn: 'root'
})
export class PortraitService {
	constructor(private apollo: Apollo) { }

	public getPortrait() {
		return this.apollo.watchQuery<GetPortraitPageQueryResult>({
			query: getPortraitPageQuery()
		}).valueChanges;
	}
}
