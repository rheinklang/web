import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetTeamQueryResponse, getTeamQuery } from '../queries/team';

@Injectable({
	providedIn: 'root'
})
export class TeamService {
	constructor(private apollo: Apollo) { }

	public getTeam() {
		return this.apollo.watchQuery<GetTeamQueryResponse>({
			query: getTeamQuery()
		}).valueChanges;
	}
}
