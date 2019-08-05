import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-grid-row',
	templateUrl: './row.component.html',
	styleUrls: ['./row.component.scss']
})
export class RowComponent {
	@Input() reverse = false;

	get aggregatedRowSizeClasses() {
		return ['h-row', this.reverse ? 'h-row--reverse' : undefined]
			.filter(Boolean)
			.join(' ');
	}
}
