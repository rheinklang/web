import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-accordion-panel',
	templateUrl: './accordion-panel.component.html',
	styleUrls: ['./accordion-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AccordionPanelComponent {
	@Input() opened = false;
	@Input() title: string;
	@Input() id?: string;
	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	public get iconPrefix() {
		return {
			select: this.opened ? 'arrow-up' : 'arrow-down',
			color: '#000',
			width: 32,
			height: 32
		};
	}
}
