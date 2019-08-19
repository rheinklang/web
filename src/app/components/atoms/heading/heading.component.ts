import { Component, Input } from '@angular/core';

@Component({
	selector: 'rk-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
	@Input() public size: string;
	@Input() public text: string;
	@Input() public anchor = false;

	public get id() {
		return this.anchor ? this.text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : null;
	}
}
