import { Component, OnInit, Input } from '@angular/core';
import { trackGTMEvent } from 'app/utils/gtag';

@Component({
	selector: 'rk-stage-slide-item',
	templateUrl: './stage-slide-item.component.html',
	styleUrls: ['./stage-slide-item.component.scss'],
})
export class StageSlideItemComponent {
	@Input() public image?: string;
	@Input() public title?: string;
	@Input() public text?: string;
	@Input() public ctaLink?: string;
	@Input() public ctaLinkParams: Record<string, any> = {};
	@Input() public ctaText?: string;

	public trackLinkClick() {
		trackGTMEvent('leap', {
			category: 'navigation',
			label: `${this.title} - ${this.ctaText}`,
			value: this.ctaLink,
		});
	}
}
