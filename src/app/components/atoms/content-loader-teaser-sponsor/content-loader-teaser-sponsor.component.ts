import { Component, ViewEncapsulation } from '@angular/core';
import { isMobileDevice } from '../../../utils/device';

@Component({
	selector: 'rk-content-loader-teaser-sponsor',
	templateUrl: './content-loader-teaser-sponsor.component.html',
	styleUrls: ['./content-loader-teaser-sponsor.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderTeaserSponsorComponent {
	public fillStyle = {
		fill: '#0000',
	};

	public primaryColor = isMobileDevice() ? '#fafafa' : '#efefef';
	public secondaryColor = isMobileDevice() ? '#eaeaea' : '#eaeaea';
}
