import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FacebookService } from '../../../services/facebook.service';

declare var FB;

@Component({
	selector: 'rk-facebook-messenger-integration',
	templateUrl: './facebook-messenger-integration.component.html',
	styleUrls: ['./facebook-messenger-integration.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookMessengerIntegrationComponent implements OnInit {
	constructor(private facebookService: FacebookService) {}
	public ngOnInit() {
		this.facebookService.attachAsyncInit();
		this.facebookService.loadCustomerMessengerWidget();
	}

	public get facebookPageId() {
		return environment.facebookPageId;
	}

	public get messengerRefId() {
		// TODO: maybe introduce active route ID
		return 'website';
	}
}
