import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TeamGQL } from '../queries/Team.query';

@Injectable({
	providedIn: 'root'
})
export class TeamService {
	constructor(private teamGQL: TeamGQL) { }

	public getTeam() {
		return this.teamGQL.watch(undefined, {
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(
			map(res => res.data.teamCollection)
		);
	}
}
