import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FlyoutService } from '../../../services/flyout.service';

@Component({
	selector: 'rk-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LinkComponent {
	@Input() public href: string;
	@Input() public text: string;
	@Input() public showIndicator = false;
	@Input() public prefetch = false;
	@Input() public icon?: string;
	@Input() public iconColor = '#ffffff';
	@Input() public iconPosition: 'pre' | 'post' = 'pre';
	@Input() public color?: string;
	@Input() public queryParams?: Record<string, any> = {};
	@Input() public target?: string;

	constructor(private flyoutService: FlyoutService) {}

	public get needsRelationSafety() {
		return this.target === '_blank' ? true : false;
	}

	public handleLinkClick() {
		this.flyoutService.close();
	}
}
