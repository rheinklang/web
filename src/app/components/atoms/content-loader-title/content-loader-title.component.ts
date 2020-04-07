import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'rk-content-loader-title',
	templateUrl: './content-loader-title.component.html',
	styleUrls: ['./content-loader-title.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderTitleComponent {
	@Input() size = 30;
	public fillStyle = {
		fill: '#0000',
	};

	public primaryColor = '#efefef';
	public secondaryColor = '#eaeaea';
}
