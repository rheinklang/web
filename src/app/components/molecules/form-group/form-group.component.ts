import { Component, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { InputComponent } from '../../atoms/input/input.component';
import { SelectComponent } from '../../atoms/select/select.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';

@Component({
	selector: 'rk-form-group',
	templateUrl: './form-group.component.html',
	styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements AfterContentInit {
	@Input() public title: string;
	@Input() public useGridLayout = true;
	@Input() public id: string;
	@Input() public note?: string;

	@ContentChildren(InputComponent, { descendants: true })
	private inputs: QueryList<InputComponent>;

	@ContentChildren(SelectComponent, { descendants: true })
	private selects: QueryList<SelectComponent>;

	@ContentChildren(CheckboxComponent, { descendants: true })
	private checkboxes: QueryList<CheckboxComponent>;

	public ngAfterContentInit() {
		this.inputs.toArray().forEach((input) => (input.name = this.id));
		this.selects.toArray().forEach((input) => (input.name = this.id));
		this.checkboxes.toArray().forEach((input) => (input.name = this.id));
	}
}
