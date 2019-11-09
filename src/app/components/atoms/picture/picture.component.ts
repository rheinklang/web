import lazySizes from 'lazysizes';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { resolveDynamicAssetPath } from '../../../utils/image';

lazySizes.cfg.lazyClass = 'a-image--lazy';
lazySizes.cfg.preloadClass = 'state-a-image--preaload';
lazySizes.cfg.loadingClass = 'state-a-image--loading';
lazySizes.cfg.loadedClass = 'state-a-image--loaded';

export const breakpoints = [
	320,
	550,
	786,
	992,
	1200
];

const IMAGE_OPT_FACTOR = 1.2;

@Component({
	selector: 'rk-picture',
	templateUrl: './picture.component.html',
	styleUrls: ['./picture.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PictureComponent {
	@Input() public src: string;
	@Input() public lazy = true;
	@Input() public rounded: 'none' | 'small' | 'medium' | 'large' | 'full' = 'none';
	@Input() public width?: string;
	@Input() public height?: string;
	@Input() public alt?: string;
	@Input() public placeholderSize?: [number, number] = [0, 0];
	@Input() public description?: string;

	public get source() {
		return resolveDynamicAssetPath({ path: this.src });
	}

	public get sources() {
		if (!this.src) {
			return [];
		}

		const sources = breakpoints.map((breakpoint, index) => ({
			url: `${resolveDynamicAssetPath({ path: this.src })}&w=${Math.round(breakpoint * IMAGE_OPT_FACTOR)}`,
			breakpoint: index === 0 ? undefined : `(min-width: ${breakpoint}px)`
		}));

		return sources.reverse();
	}
}
