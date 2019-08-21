import { Component, Input } from '@angular/core';

@Component({
	selector: 'rk-content-block',
	templateUrl: './content-block.component.html',
	styleUrls: [
		'./content-block.component.scss',
		'./content-block.colors.scss',
		'./content-block.patterns.scss',
		'./content-block.spacings.scss'
	]
})
export class ContentBlockComponent {
	@Input() public title?: string;
	@Input() public color?: string;
	@Input() public pattern?: string;
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
