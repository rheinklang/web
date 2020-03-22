import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'rk-stage-slide-item',
	templateUrl: './stage-slide-item.component.html',
	styleUrls: ['./stage-slide-item.component.scss'],
})
export class StageSlideItemComponent {
	@Input() public image?: string;
	@Input() public title?: string;
	@Input() public text?: string;
	@Input() public ctaLink?: string;
	@Input() public ctaLinkParams: Record<string, any> = {};
	@Input() public ctaText?: string;
}
