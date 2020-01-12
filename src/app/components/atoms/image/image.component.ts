import lazySizes from 'lazysizes';
import { Component, ViewEncapsulation, Input } from '@angular/core';

lazySizes.cfg.lazyClass = 'a-image--lazy';
lazySizes.cfg.preloadClass = 'state-a-image--preaload';
lazySizes.cfg.loadingClass = 'state-a-image--loading';
lazySizes.cfg.loadedClass = 'state-a-image--loaded';

export const breakpoints = [320, 550, 786, 992, 1200];

@Component({
	selector: 'rk-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ImageComponent {
	@Input() public src: string;
	@Input() public lazy = true;
	@Input() public rounded: 'none' | 'small' | 'medium' | 'large' | 'full' = 'none';
	@Input() public width?: string;
	@Input() public height?: string;
	@Input() public alt?: string;
	@Input() public placeholderSize?: [number, number] = [0, 0];
	@Input() public description?: string;

	public INITIAL_SOURCE_SET = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

	public get sourceset() {
		if (!this.src) {
			return null;
		}

		return breakpoints.map(breakpoint => `${this.src}&w=${breakpoint}`).join(',');
	}

	public get sources() {
		if (!this.src) {
			return null;
		}

		return breakpoints.map((breakpoint, index) => ({
			url: `${this.src}&w=${breakpoint}`,
			breakpoint: index === 0 ? undefined : `(max-width: ${breakpoint}px)`
		}));
	}
}
