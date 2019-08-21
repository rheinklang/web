import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { PortraitService } from '../../services/portrait.service';
import { TeamService } from '../../services/team.service';
import { GetTeamQueryResponse } from '../../queries/team';
import { resolveCDNAssetPath } from '../../utils/image';

@Component({
	selector: 'rk-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	public groupPortraitImagePath: string;
	public groupPortraitDescription = '';
	public teamMembers: GetTeamQueryResponse['teamCollection'] = [];

	constructor(private portraitService: PortraitService, private teamService: TeamService) { }

	public ngOnInit() {
		combineLatest(
			this.portraitService.getPortrait(),
			this.teamService.getTeam()
		).pipe(
			map(([portrait, team]) => {
				const visibleMemberIds = (portrait.data.portraitPageSingleton.visibleMemberList || []).map(entry => entry._id);

				return {
					groupPortraitDescription: portrait.data.portraitPageSingleton.groupPortraitDescription || '',
					groupPortraitImagePath: portrait.data.portraitPageSingleton.groupPortraitImage.path,
					teamMembers: team.data.teamCollection.filter(({ _id }) => visibleMemberIds.indexOf(_id) >= 0)
				};
			})
		).subscribe(values => {
			this.groupPortraitDescription = values.groupPortraitDescription;
			this.groupPortraitImagePath = values.groupPortraitImagePath;
			this.teamMembers = values.teamMembers;
		});
	}

}
