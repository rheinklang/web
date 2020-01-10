import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-button-facebook',
	templateUrl: './button-facebook.component.html',
	styleUrls: ['./button-facebook.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonFacebookComponent {
	@Input() public url: string;
}
