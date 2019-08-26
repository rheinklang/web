import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FlyoutService } from '../../../services/flyout.service';

@Component({
	selector: 'rk-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LinkComponent {
	@Input() public href: string;
	@Input() public text: string;
	@Input() public showIndicator = false;
	@Input() public icon?: string;
	@Input() public iconPosition: 'pre' | 'post' = 'pre';
	@Input() public color?: string;

	private $target = '_self';
	public needsRelationSafety = false;

	constructor(private flyoutService: FlyoutService) { }

	@Input()
	public set target(value: string) {
		if (value === '_blank') {
			this.needsRelationSafety = true;
		}

		this.$target = value;
	}

	public get target() {
		return this.$target;
	}

	public handleLinkClick() {
		this.flyoutService.close();
	}
}
