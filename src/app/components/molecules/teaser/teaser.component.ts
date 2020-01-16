import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	ViewChild,
	AfterViewInit
} from '@angular/core';
import { ITag } from '../../atoms/tag/tag.component';
import { TagListComponent } from '../tag-list/tag-list.component';

@Component({
	selector: 'rk-teaser',
	templateUrl: './teaser.component.html',
	styleUrls: ['./teaser.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TeaserComponent implements AfterViewInit {
	@Input() public id: string;
	@Input() public title: string;
	@Input() public excerpt: string;
	@Input() public subtitle?: string;
	@Input() public previewImage?: { path: string };
	@Input() public tags: ITag[] = [];
	@Input() public disableAnimation = false;

	@Output() public hovered = new EventEmitter<void>();
	@Output() public tagClicked = new EventEmitter<string>();

	@ViewChild('tagList', { static: false })
	private tagList: TagListComponent;

	public ngAfterViewInit() {
		this.tagList.clicked.subscribe((id: string) => {
			this.tagClicked.emit(id);
		});
	}

	public triggerHoverEvent() {
		this.hovered.emit();
	}

	public get link() {
		return [`/articles/${this.id}`];
	}
}
