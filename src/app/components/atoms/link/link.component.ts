import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss']
})
export class LinkComponent {
	@Input() href: string;
	@Input() icon?: string;
	@Input() text: string;

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
