import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
	selector: 'rkTooltip, [rkTooltip]'
})
export class TooltipDirective implements AfterViewInit {
	@Input() public tooltipText = '';
	@Input() public tooltipPosition: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' = 'top';

	constructor(private el: ElementRef<HTMLElement>) { }

	public ngAfterViewInit(): void {
		if (!this.tooltipText) {
			return;
		}

		this.el.nativeElement.style.cursor = 'help';
		this.el.nativeElement.setAttribute('role', 'tooltip');
		this.el.nativeElement.setAttribute('aria-label', this.tooltipText);
		this.el.nativeElement.setAttribute('data-microtip-position', this.tooltipPosition);
	}

}
