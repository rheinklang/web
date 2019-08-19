import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'rk-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent {
	@Input() public type = 'text';
	@Input() public placeholder = '';
	@Input() public initialValue: string;
	@Input() public name = 'input';
	@Output() public changeEvent = new EventEmitter<string>();

	public setUserInput(value: string) {
		this.changeEvent.emit(value);
	}
}
