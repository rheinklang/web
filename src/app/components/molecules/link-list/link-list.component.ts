import { Component, QueryList, ContentChildren, OnDestroy, Input } from '@angular/core';
import { LinkComponent } from '../../atoms/link/link.component';

@Component({
	selector: 'rk-link-list',
	templateUrl: './link-list.component.html',
	styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnDestroy {
	@Input() public layout: 'vertical' | 'horizontal' = 'vertical';
	@Input() public color?: string;
	@Input() public type?: string;
	@Input() public title?: string;
	@Input() public headingSize?: string;
	@ContentChildren(LinkComponent) linkComponents: QueryList<LinkComponent>;

	public get links() {
		return this.linkComponents.toArray();
	}

	public ngOnDestroy() {
		this.linkComponents.destroy();
	}
}
