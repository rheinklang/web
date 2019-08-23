import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'rk-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Output() handleClick = new EventEmitter<any>();

	public onInternalClick(ev: Event) {
		this.handleClick.emit(ev);
	}
}
