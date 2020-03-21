import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-content-block',
	templateUrl: './content-block.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./content-block.component.scss',
		'./content-block.colors.scss',
		'./content-block.patterns.scss',
		'./content-block.spacings.scss',
	],
})
export class ContentBlockComponent {
	@Input() public heading?: string;
	@Input() public color?: string;
	@Input() public pattern?: string;
	@Input() public size = 2;
	@Input() public centerHeading = false;
	@Input() public skew = false;
	@Input() public space?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

	public get modifiers() {
		const modifierClassNames = [];

		if (this.pattern) {
			modifierClassNames.push(`o-content-block--pattern-${this.pattern}`);
		}

		if (this.color) {
			modifierClassNames.push(`o-content-block--color-${this.color}`);
		}

		if (this.space) {
			modifierClassNames.push(`o-content-block--space-${this.space}`);
		}

		return modifierClassNames.join(' ');
	}
}
