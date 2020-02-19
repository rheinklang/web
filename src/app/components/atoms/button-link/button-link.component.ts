import { Component, Input, ViewEncapsulation } from '@angular/core';
import { generateUrchingTrackingURL } from '../../../utils/utm';

@Component({
	selector: 'rk-button-link',
	templateUrl: './button-link.component.html',
	styleUrls: ['./button-link.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonLinkComponent {
	@Input() public href: string;
	@Input() public target = '_blank';
	@Input() public secure = true;
	@Input() public label = 'link';
	@Input() public campaign: string;
	@Input() public modifier: string;

	public get relationAttributeValue() {
		return this.secure ? 'noopener noreferrer' : '';
	}

	public get url() {
		return generateUrchingTrackingURL(this.href, this.campaign);
	}

	public get classList() {
		return ['a-button-link', this.modifier ? `a-button-link--${this.modifier}` : null].filter(Boolean).join(' ');
	}
}
