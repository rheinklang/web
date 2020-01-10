import { Component, OnInit } from '@angular/core';
import { SponsorsService } from '../../services/sponsors.service';
import { SponsorGQLEntry } from '../../queries/Sponsors.query';
import { SponsorsSingletonGQLResponse } from '../../queries/Sponsors.singleton';

@Component({
	selector: 'rk-sponsors-overview',
	templateUrl: './sponsors-overview.component.html',
	styleUrls: ['./sponsors-overview.component.scss']
})
export class SponsorsOverviewComponent implements OnInit {
	public sponsors: SponsorGQLEntry[];
	public pageData: SponsorsSingletonGQLResponse['sponsorsPageSingleton'];

	constructor(private sponsorsService: SponsorsService) { }

	ngOnInit() {
		this.sponsorsService.getSponsors().subscribe(sponsors => {
			this.sponsors = sponsors;
		});

		this.sponsorsService.getSingleton().subscribe(data => {
			this.pageData = data;
		});
	}
}
