import { Component, Input, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export interface StageSliderSlide {
	image: string;
	title?: string;
	text?: string;
	ctaLink?: string;
	ctaText?: string;
}

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

	private swiperInstance?: Swiper;

	public ngAfterViewInit() {
		if (!this.slides || this.slides.length === 0) {
			return console.error(`StageSliderComponent didn't receive any slides, check your implementation`);
		}

		this.swiperInstance = new Swiper(`.o-stage-slider--${this.id}`, {
			direction: 'horizontal',
			centeredSlides: true,
			// @ts-ignore
			centeredSlidesBounds: true,
			slideClass: 'o-stage-slider__slide',
			preventClicks: false,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			height: 600,
			autoHeight: false,
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
