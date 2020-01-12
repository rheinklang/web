import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

export interface ITagList {
	tags: string[];
}

@Component({
	selector: 'rk-tag-list',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TagListComponent implements ITagList {
	@Input() public tags: string[] = [];
	@Input() public active?: string;
	@Input() public interactive = false;

	@Output() public clicked = new EventEmitter<string>();

	public handleTagClick(id: string) {
		this.clicked.emit(id);
	}

	public isActive(id: string) {
		return this.active === id;
	}
}
