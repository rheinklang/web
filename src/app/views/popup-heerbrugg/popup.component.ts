import { Component, OnInit, OnDestroy } from '@angular/core';
// import { SponsorsService, SponsorsServiceEntry } from '../../services/sponsors.service';
// import { SponsorsSingletonGQLResponse } from '../../queries/Sponsors.singleton';
import { sponsorSortAlgorithm } from '../../utils/sponsor';
import { sortByYear } from '../../utils/sort';
import { Subscription } from 'rxjs';
import { unsubscribe } from '../../utils/subscription';

// interface SponsorsYearMap {
// 	[year: string]: SponsorsServiceEntry[];
// }

@Component({
	selector: 'rk-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
})
export class PopupComponent /* implements OnInit, OnDestroy */ {
	// public sponsors: Array<[string, SponsorsServiceEntry[]]> = [];
	// public pageData: SponsorsSingletonGQLResponse['sponsorsPageSingleton'];
	// private sponsorsSub$: Subscription;
	// private sponsorSingletonSub$: Subscription;
	// constructor(private sponsorsService: SponsorsService) { }
	// public ngOnInit() {
	// 	this.sponsorsService.getSponsors().subscribe((sponsors) => {
	// 		const groupedSponsors = sponsors.reduce(
	// 			(acc, curr) => ({
	// 				...acc,
	// 				[curr.lastActiveYear]: [...(acc[curr.lastActiveYear] || []), curr],
	// 			}),
	// 			{} as SponsorsYearMap
	// 		);
	// 		this.sponsors = Object.keys(groupedSponsors)
	// 			.sort(sortByYear)
	// 			.filter((y) => typeof y === 'string' && y.length > 0)
	// 			.reduce(
	// 				(acc, curr): [string, SponsorsServiceEntry[]][] => [
	// 					...acc,
	// 					[curr, sponsorSortAlgorithm(groupedSponsors[curr])],
	// 				],
	// 				[] as [string, SponsorsServiceEntry[]][]
	// 			)
	// 			.reverse();
	// 	});
	// 	this.sponsorsService.getSingleton().subscribe((data) => {
	// 		this.pageData = data;
	// 	});
	// }
	// public ngOnDestroy() {
	// 	unsubscribe([this.sponsorsSub$, this.sponsorSingletonSub$]);
	// }
}
