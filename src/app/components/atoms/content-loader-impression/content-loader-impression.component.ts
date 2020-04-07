import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'rk-content-loader-impression',
	templateUrl: './content-loader-impression.component.html',
	styleUrls: ['./content-loader-impression.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderImpressionComponent {
	@Input() size = 30;
	public fillStyle = {
		fill: '#0000',
	};

	public primaryColor = '#efefef';
	public secondaryColor = '#eaeaea';
}
