import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

@Directive({
	selector: 'rkScrollAnchor, [rkScrollAnchor]'
})
export class ScrollAnchorDirective implements AfterViewInit {
	@Input() public scrollAnchorId?: string;

	constructor(private el: ElementRef<HTMLElement>) { }

	private get id() {
		return this.scrollAnchorId.trim().replace(/\s/gi, '-').toLowerCase();
	}

	public ngAfterViewInit(): void {
		if (this.el.nativeElement.hasAttribute('id') || !this.scrollAnchorId) {
			return;
		}

		this.el.nativeElement.setAttribute('id', `${this.id}`);
	}

}
