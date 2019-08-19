import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'rk-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
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
}
