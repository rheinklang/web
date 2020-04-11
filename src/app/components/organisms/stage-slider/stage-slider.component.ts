import { Component, Input, AfterViewInit, OnDestroy, ViewEncapsulation, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { isMobileDevice } from '../../../utils/device';
import { trackGTMEvent } from '../../../utils/gtag';
import {
	SliderConfigService,
	SliderConfig,
	DEFAULT_AUTOPLAY_MOBILE_INTERVAL,
	DEFAULT_AUTOPLAY_DESKTOP_INTERVAL,
} from '../../../services/sliderConfig.service';

export interface StageSliderSlide {
	image: string;
	title?: string;
	text?: string;
	ctaLink?: string;
	ctaText?: string;
	ctaLinkParams?: Record<string, any>;
}

@Component({
	selector: 'rk-stage-slider',
	templateUrl: './stage-slider.component.html',
	styleUrls: ['./stage-slider.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class StageSliderComponent implements AfterViewInit, OnInit, OnDestroy {
	public static instanceCount = 0;

	@Input() public id = StageSliderComponent.instanceCount++;
	@Input() public slides: StageSliderSlide[] = [];
	@Input() public enablePagination = true;
	@Input() public enableNavigation = true;
	@Input() public enableScrollbar = false;
	public sliderConfig: SliderConfig = {
		loopEnabled: true,
		sliderAutoplaySpeedMobile: DEFAULT_AUTOPLAY_MOBILE_INTERVAL,
		sliderAutoplaySpeedDesktop: DEFAULT_AUTOPLAY_DESKTOP_INTERVAL,
	};

	private swiperInstance?: Swiper;

	constructor(private sliderConfigService: SliderConfigService) {}

	public ngOnInit() {
		this.sliderConfigService.getConfig().subscribe((config) => {
			this.sliderConfig = config;
		});
	}

	public ngAfterViewInit() {
		if (!this.slides || this.slides.length === 0) {
			return console.error(`StageSliderComponent didn't receive any slides, check your implementation`);
		}

		const isMobile = isMobileDevice();
		const { loopEnabled, sliderAutoplaySpeedDesktop, sliderAutoplaySpeedMobile } = this.sliderConfig;

		this.swiperInstance = new Swiper(`.o-stage-slider--${this.id}`, {
			direction: 'horizontal',
			centeredSlides: true,
			// @ts-ignore
			centeredSlidesBounds: true,
			slideClass: 'o-stage-slider__slide',
			preventClicks: false,
			autoplay: {
				delay: isMobile ? sliderAutoplaySpeedMobile : sliderAutoplaySpeedDesktop,
				disableOnInteraction: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			loop: loopEnabled,
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
			trackGTMEvent('slider_navigation', {
				category: 'navigation',
				label: `Stage Slider ${this.id} - Slide ${this.swiperInstance.activeIndex}`,
				value: `${this.swiperInstance.activeIndex} - ${dir}`,
			});
		}
	}
}
