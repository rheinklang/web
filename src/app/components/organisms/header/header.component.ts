import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { NavigationQueryResponse } from '../../../queries/navigation-singleton';

@Component({
	selector: 'rk-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public navigationTitles: NavigationQueryResponse['navigationSingleton']
		= {} as NavigationQueryResponse['navigationSingleton'];

	constructor(private navigationService: NavigationService) { }

	public ngOnInit() {
		this.navigationService.getNavigationTitles().subscribe(({ data }) => {
			this.navigationTitles = data.navigationSingleton;
		});
	}
}
