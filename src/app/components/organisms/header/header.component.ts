import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { FlyoutService } from '../../../services/flyout.service';
import { NavigationSingletonGQLResponse } from '../../../queries/Navigation.singleton';

@Component({
	selector: 'rk-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() public flyoutNavigationOpen = false;

	public navigationTitles: NavigationSingletonGQLResponse['navigationSingleton'] = {} as NavigationSingletonGQLResponse['navigationSingleton'];

	constructor(private navigationService: NavigationService, private flyoutService: FlyoutService) {}

	public ngOnInit() {
		this.flyoutService.changeDetection.subscribe(() => {
			this.flyoutNavigationOpen = this.flyoutService.isOpen;
		});

		this.navigationService.getNavigationTitles().subscribe(data => {
			this.navigationTitles = data;
		});
	}

	public setFlyoutState(isOpen: boolean) {
		isOpen ? this.flyoutService.open() : this.flyoutService.close();
	}
}
