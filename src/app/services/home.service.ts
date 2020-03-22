import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HomeSingletonGQL } from '../queries/Home.singleton';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	constructor(private homeSingletonGQL: HomeSingletonGQL) {}

	public getEventTeaser() {
		return this.homeSingletonGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(
				map((res) => res.data.homePageSingleton),
				map((singleton) => singleton.showcaseEvent)
			);
	}

	public getSwiperConfig() {
		return this.homeSingletonGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(
				map((res) => res.data.homePageSingleton),
				map((singleton) => ({
					autoplayDelay: {
						mobile: singleton.sliderAutoplaySpeedMobile
							? parseInt(singleton.sliderAutoplaySpeedMobile, 10)
							: undefined,
						desktop: singleton.sliderAutoplaySpeedDesktop
							? parseInt(singleton.sliderAutoplaySpeedDesktop, 10)
							: undefined,
					},
				}))
			);
	}

	public getSlides() {
		return this.homeSingletonGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY,
			})
			.valueChanges.pipe(
				map((res) => res.data.homePageSingleton),
				// extract cockpit set value field
				map((singleton) => singleton.slides.map((slide) => slide.value)),
				// add index count to each slide
				map((slides) => slides.map((slide, index) => ({ ...slide, index }))),
				// parse query parameters to object to pass to router link
				map((slides) =>
					slides.map((slide) => ({ ...slide, ctaLinkparams: JSON.parse(slide.ctaLinkparams || '{}') }))
				)
			);
	}
}
