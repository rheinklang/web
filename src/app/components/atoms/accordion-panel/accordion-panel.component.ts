import { Component, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';

@Component({
	selector: 'rk-accordion-panel',
	templateUrl: './accordion-panel.component.html',
	styleUrls: ['./accordion-panel.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AccordionPanelComponent implements AfterViewInit {
	@Input() opened = false;
	@Input() title: string;
	@Input() id?: string;
	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	constructor(private elementRef: ElementRef<HTMLDivElement>) {}

	public ngAfterViewInit() {
		if (this.opened && this.elementRef.nativeElement) {
			window.scrollTo({
				top: this.elementRef.nativeElement.offsetTop,
			});
		}
	}

	public get iconPrefix() {
		return {
			select: this.opened ? 'arrow-up' : 'arrow-down',
			color: '#000',
			width: 32,
			height: 32,
		};
	}
}
