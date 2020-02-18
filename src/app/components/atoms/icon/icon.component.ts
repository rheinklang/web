import { Component, Input, ViewEncapsulation } from '@angular/core';

import(/* webpackChunkName: "svgxuse" */ 'svgxuse/svgxuse.min.js');

@Component({
	selector: 'rk-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class IconComponent {
	@Input() public select: string;
	@Input() public color: string;
	@Input() public width?: number;
	@Input() public height?: number;
}
