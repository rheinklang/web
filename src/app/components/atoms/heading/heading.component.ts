import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface HeadingIconProps {
	select: string;
	color?: string;
	width?: string;
	height?: string;
}

@Component({
	selector: 'rk-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeadingComponent {
	@Input() public size: string;
	@Input() public text: string;
	@Input() public blockTitle = false;
	@Input() public anchor = false;
	@Input() public noSpace = false;
	@Input() public center = false;
	@Input() public visualSize?: string;
	@Input() public icon?: HeadingIconProps;
	@Input() public iconPrefix?: HeadingIconProps;

	public get id() {
		return this.anchor ? this.text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : null;
	}

	public get tag() {
		return parseInt(this.size, 10);
	}

	public get renderingSize() {
		return this.visualSize || this.size;
	}
}
