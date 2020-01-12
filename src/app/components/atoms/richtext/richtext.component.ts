import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-richtext',
	templateUrl: './richtext.component.html',
	styleUrls: ['./richtext.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RichtextComponent {
	@Input() public text = '';
	@Input() public size: 'small' | 'medium' | 'large' = 'medium';
}
