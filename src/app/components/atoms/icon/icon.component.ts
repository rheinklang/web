import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TooltipDirective } from '../../../directives/tooltip.directive';

@Component({
	selector: 'rk-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class IconComponent {
	@Input() public select: string;
	@Input() public color: string;
}
