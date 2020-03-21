import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'rk-lightbox',
	templateUrl: './lightbox.component.html',
	styleUrls: ['./lightbox.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LightboxComponent {
	@Input() public id: string;
	@Input() public src: string;
}
