import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

export interface ITag {
	text: string;
}

@Component({
	selector: 'rk-tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TagComponent implements ITag {
	@Input() public text: string;
	@Input() public interactive = false;
	@Input() public active = false;

	@Output() public clicked = new EventEmitter<string>();

	public get title() {
		return this.interactive ? `Filtere nach "${this.text}"` : undefined;
	}

	public handleClick(): void {
		this.clicked.emit(this.text);
	}
}
