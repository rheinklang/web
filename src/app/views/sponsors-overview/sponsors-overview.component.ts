import { Component, OnInit } from '@angular/core';
import { of, zip } from 'rxjs';
import { groupBy, flatMap, filter, mergeMap, toArray, map } from 'rxjs/operators';
import { SponsorsService, SponsorsServiceEntry } from '../../services/sponsors.service';
import { SponsorGQLEntry } from '../../queries/Sponsors.query';
import { SponsorsSingletonGQLResponse } from '../../queries/Sponsors.singleton';
import { SponsorLevel, SponsorLevelType } from '../../types/Sponsor';
import { dynamicSort } from '../../utils/sort';

interface SponsorsYearMap {
	[year: string]: SponsorsServiceEntry[];
}

const sponsorLevelToOrderNumber = (level: SponsorLevelType) => {
	switch (level) {
		case SponsorLevel.BRONZE:
			return 1;
		case SponsorLevel.SILVER:
			return 2;
		case SponsorLevel.GOLD:
			return 3;
		case SponsorLevel.PLATINUM:
			return 4;
		default:
			return 0;
	}
};

const sortByYear = (ai: string | 0, bi: string | 0) => {
	const a = typeof ai === 'number' ? ai : parseInt(ai, 10);
	const b = typeof bi === 'number' ? bi : parseInt(bi, 10);

	return a === b ? 0 : (a > b ? 1 : -1);
}

const orderSponsors = (sponsors: SponsorsServiceEntry[]) =>
	sponsors
		.map(sponsor => ({ ...sponsor, numericLevelValue: sponsorLevelToOrderNumber(sponsor.level) }))
		.sort(dynamicSort('name'))
		.sort((a, b) => a.sortWeight === b.sortWeight ? 0 : (a.sortWeight > b.sortWeight ? - 1 : 1))
		.sort((a, b) => a.numericLevelValue > b.numericLevelValue ? -1 : 1);

@Component({
	selector: 'rk-sponsors-overview',
	templateUrl: './sponsors-overview.component.html',
	styleUrls: ['./sponsors-overview.component.scss']
})
export class SponsorsOverviewComponent implements OnInit {
	public sponsors: Array<[string, SponsorsServiceEntry]> = [];
	public pageData: SponsorsSingletonGQLResponse['sponsorsPageSingleton'];

	constructor(private sponsorsService: SponsorsService) { }

	ngOnInit() {
		this.sponsorsService.getSponsors().subscribe(sponsors => {
			const groupedSponsors = sponsors.reduce((acc, curr) => ({
				...acc,
				[curr.lastActiveYear]: [
					...(acc[curr.lastActiveYear] || []),
					curr
				]
			}), {} as SponsorsYearMap);

			this.sponsors = Object.keys(groupedSponsors)
				.sort(sortByYear)
				.filter(y => typeof y === 'string' && y.length > 0)
				.reduce((acc, curr) => ([
					...acc,
					[curr, orderSponsors(groupedSponsors[curr])]
				]), [] as [string, SponsorsServiceEntry][])
				.reverse();
		});

		this.sponsorsService.getSingleton().subscribe(data => {
			this.pageData = data;
		});
	}
}
