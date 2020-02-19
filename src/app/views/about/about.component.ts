import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { PortraitService } from '../../services/portrait.service';
import { TeamService } from '../../services/team.service';
import { unsubscribe } from '../../utils/subscription';
import { TeamSchema } from '../../schema/TeamSchema';

@Component({
	selector: 'rk-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {
	public groupPortraitImagePath: string;
	public groupPortraitDescription = '';
	public teamMembers: TeamSchema[] = [];

	private combinedSub$: Subscription;

	constructor(private portraitService: PortraitService, private teamService: TeamService) {}

	public ngOnInit() {
		this.combinedSub$ = combineLatest([this.portraitService.getPortrait(), this.teamService.getTeam()])
			.pipe(
				map(([portrait, team]) => {
					const visibleMemberIds = (portrait.visibleMemberList || []).map(entry => entry._id);

					return {
						groupPortraitDescription: portrait.groupPortraitDescription || '',
						groupPortraitImagePath: portrait.groupPortraitImage.path,
						teamMembers: team.filter(({ _id }) => visibleMemberIds.indexOf(_id) >= 0)
					};
				})
			)
			.subscribe(values => {
				this.groupPortraitDescription = values.groupPortraitDescription;
				this.groupPortraitImagePath = values.groupPortraitImagePath;
				this.teamMembers = values.teamMembers;
			});
	}

	public ngOnDestroy() {
		unsubscribe([this.combinedSub$]);
	}
}
