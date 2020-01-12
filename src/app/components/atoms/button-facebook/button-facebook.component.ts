import { Component, Input, ViewEncapsulation } from '@angular/core';
import { generateUrchingTrackingURL } from '../../../utils/utm';

@Component({
	selector: 'rk-button-facebook',
	templateUrl: './button-facebook.component.html',
	styleUrls: ['./button-facebook.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonFacebookComponent {
	@Input() public url: string;
	@Input() public campaign: string;
	@Input() public version: 'small' | 'full' = 'small';

	public get trackableFacebookURL() {
		if (this.url) {
			return generateUrchingTrackingURL(this.url, this.campaign);
		}
	}
}
