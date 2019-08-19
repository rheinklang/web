import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class IconComponent {
	@Input() select: string;
}
