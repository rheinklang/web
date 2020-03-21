import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'rk-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent {
	@Input() public disabled = false;
	@Input() public type = 'text';
	@Input() public placeholder = '';
	@Input() public initialValue: string;
	@Input() public name = 'input';
	@Input() public required = false;
	@Input() public formControlName: string;
	@Output() public changeEvent = new EventEmitter<string>();
	@Output() public doneEvent = new EventEmitter<string>();

	// internal value placeholder
	private val = '';

	public setUserInput(value: string) {
		this.val = value;
		this.changeEvent.emit(value);
	}

	public setInputLeave(value: string) {
		if (this.val === value) {
			return;
		}

		this.val = value;
		this.changeEvent.emit(value);
		this.doneEvent.emit(value);
	}

	public get value() {
		return this.val;
	}
}
