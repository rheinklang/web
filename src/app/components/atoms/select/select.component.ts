import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

export interface ISelectOption {
	name: string;
	default?: boolean;
}

@Component({
	selector: 'rk-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SelectComponent {
	@Input() public placeholder = '';
	@Input() public initialValue: string;
	@Input() public formControlName: string;
	@Input() public name = 'input';
	@Input() public options: string[] = [];

	@Output() public changeEvent = new EventEmitter<string>();
	@Output() public doneEvent = new EventEmitter<string>();

	// internal value placeholder
	public selectedValue: string | undefined;

	public setUserInput(value: string) {
		this.selectedValue = value;
		this.changeEvent.emit(value);
	}

	public setInputLeave(value: string) {
		if (this.selectedValue === value) {
			return;
		}

		this.selectedValue = value;
		this.changeEvent.emit(value);
		this.doneEvent.emit(value);
	}
}
