import { Injectable } from "@angular/core";
import { HomeSingletonGQL } from '../queries/Home.singleton';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	constructor(private homeSingleton: HomeSingletonGQL) { }

	public getSlides() {
		return this.homeSingleton.watch(undefined, {
			fetchPolicy: 'network-only'
		}).valueChanges.pipe(
			map(res => res.data.homePageSingleton),
			map(singleton => singleton.slides.map(slide => slide.value)),
			map(slides => slides.map((slide, index) => ({ ...slide, index })))
		);
	}
}
