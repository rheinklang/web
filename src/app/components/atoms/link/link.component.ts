import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FlyoutService } from '../../../services/flyout.service';
import { trackGTMEvent, GTMCategory } from '../../../utils/gtag';

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
	@Input() public gtmLeapCategory?: GTMCategory;

	constructor(private flyoutService: FlyoutService) {}

	public get needsRelationSafety() {
		return this.target === '_blank' ? true : false;
	}

	public handleLinkClick() {
		this.flyoutService.close();

		if (this.target === '_blank') {
			trackGTMEvent('leap', {
				label: this.text,
				value: this.href,
				category: this.gtmLeapCategory || 'link',
			});
		} else {
			trackGTMEvent('leap', {
				label: this.text,
				value: this.href,
				category: this.gtmLeapCategory || 'navigation',
			});
		}
	}
}
