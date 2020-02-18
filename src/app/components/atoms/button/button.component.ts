import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
	@Input() type?: string;
	@Output() handleClick = new EventEmitter<any>();

	public onInternalClick(ev: Event) {
		this.handleClick.emit(ev);
	}
}
