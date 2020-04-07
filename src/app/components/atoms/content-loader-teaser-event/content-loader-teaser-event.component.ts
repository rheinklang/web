import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-content-loader-teaser-event',
	templateUrl: './content-loader-teaser-event.component.html',
	styleUrls: ['./content-loader-teaser-event.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderTeaserEventComponent {
	public fillStyle = {
		fill: '#0000',
	};

	public primaryColor = '#efefef';
	public secondaryColor = '#eaeaea';
}
