import { Component, OnInit } from '@angular/core';
import { SponsorsService, SponsorsServiceEntry } from '../../services/sponsors.service';
import { SponsorsSingletonGQLResponse } from '../../queries/Sponsors.singleton';
import { sponsorSortAlgorithm } from '../../utils/sponsor';
import { sortByYear } from '../../utils/sort';

interface SponsorsYearMap {
	[year: string]: SponsorsServiceEntry[];
}

@Component({
	selector: 'rk-sponsors-overview',
	templateUrl: './sponsors-overview.component.html',
	styleUrls: ['./sponsors-overview.component.scss']
})
export class SponsorsOverviewComponent implements OnInit {
	public sponsors: Array<[string, SponsorsServiceEntry[]]> = [];
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
				.reduce((acc, curr): [string, SponsorsServiceEntry[]][] => ([
					...acc,
					[curr, sponsorSortAlgorithm(groupedSponsors[curr])]
				]), [] as [string, SponsorsServiceEntry[]][])
				.reverse();
		});

		this.sponsorsService.getSingleton().subscribe(data => {
			this.pageData = data;
		});
	}
}
