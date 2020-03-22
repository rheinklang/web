import { Component, Input, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { isMobileDevice } from '../../../utils/device';

export interface StageSliderSlide {
	image: string;
	title?: string;
	text?: string;
	ctaLink?: string;
	ctaText?: string;
	ctaLinkParams?: Record<string, any>;
}

const AUTOPLAY_MOBILE_INTERVAL = 60 * 1000 * 10; // 10min
const AUTOPLAY_DESKTOP_INTERVAL = 10000000; // 6 * 1000; // 6s^

@Component({
	selector: 'rk-stage-slider',
	templateUrl: './stage-slider.component.html',
	styleUrls: ['./stage-slider.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class StageSliderComponent implements AfterViewInit, OnDestroy {
	public static instanceCount = 0;

	@Input() public id = StageSliderComponent.instanceCount++;
	@Input() public slides: StageSliderSlide[] = [];
	@Input() public enablePagination = true;
	@Input() public enableNavigation = true;
	@Input() public enableScrollbar = false;

	@Input() public mobileAutoScrollInterval = AUTOPLAY_MOBILE_INTERVAL;
	@Input() public desktopAutoScrollInterval = AUTOPLAY_DESKTOP_INTERVAL;

	private swiperInstance?: Swiper;

	public ngAfterViewInit() {
		if (!this.slides || this.slides.length === 0) {
			return console.error(`StageSliderComponent didn't receive any slides, check your implementation`);
		}

		const isMobile = isMobileDevice();

		this.swiperInstance = new Swiper(`.o-stage-slider--${this.id}`, {
			direction: 'horizontal',
			centeredSlides: true,
			// @ts-ignore
			centeredSlidesBounds: true,
			slideClass: 'o-stage-slider__slide',
			preventClicks: false,
			autoplay: {
				delay: isMobile ? this.mobileAutoScrollInterval : this.desktopAutoScrollInterval,
				disableOnInteraction: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			loop: true,
			height: isMobileDevice ? undefined : 600,
			autoHeight: isMobileDevice ? true : false,
		});
	}
	public ngOnDestroy() {
		if (this.swiperInstance) {
			this.swiperInstance.destroy(true, true);
		}
	}

	public switchSlide(dir: 'prev' | 'next') {
		if (this.swiperInstance) {
			dir === 'prev' ? this.swiperInstance.slidePrev() : this.swiperInstance.slideNext();
		}
	}
}
