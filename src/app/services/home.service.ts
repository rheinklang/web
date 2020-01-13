import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HomeSingletonGQL } from '../queries/Home.singleton';
import { CACHED_POLICY } from '../config/policies';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	constructor(private homeSingletonGQL: HomeSingletonGQL) { }

	public getSlides() {
		return this.homeSingletonGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY
			})
			.valueChanges
			.pipe(
				map(res => res.data.homePageSingleton),
				map(singleton => singleton.slides.map(slide => slide.value)),
				map(slides => slides.map((slide, index) => ({ ...slide, index })))
			);
	}
}
