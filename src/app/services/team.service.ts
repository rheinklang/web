import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TeamGQL } from '../queries/Team.query';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class TeamService {
	constructor(private teamGQL: TeamGQL) { }

	public getTeam() {
		return this.teamGQL.watch(undefined, {
			fetchPolicy: CACHED_POLICY,
		}).valueChanges.pipe(
			map(res => res.data.teamCollection)
		);
	}
}
