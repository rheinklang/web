import { Injectable } from '@angular/core';
import { EventsGQL } from '../queries/Events.query';
import { EventBySlugGQL } from '../queries/EventBySlug.query';
import { map, flatMap, first, filter } from 'rxjs/operators';
import { EventsSingletonGQL } from '../queries/Events.singleton';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	private preloadedEvents: string[] = [];

	constructor(
		private eventsGQL: EventsGQL,
		private eventBySlugGQL: EventBySlugGQL,
		private eventsSingletonGQL: EventsSingletonGQL
	) {}

	public getEvents() {
		return this.eventsGQL
			.watch({
				filter: {
					hide: false,
				},
			})
			.valueChanges.pipe(map((v) => v.data.eventsCollection));
	}

	public getEventsSingleton() {
		return this.eventsSingletonGQL.watch().valueChanges.pipe(map((v) => v.data.eventsPageSingleton));
	}

	public getEventBySlug(slug: string) {
		return this.eventBySlugGQL
			.watch({
				filter: { slug },
			})
			.valueChanges.pipe(
				map((res) => res.data.eventsCollection),
				flatMap((entry) => entry),
				first()
			);
	}
	public preloadEventBySlug(slug: string) {
		if (this.preloadedEvents.indexOf(slug) > -1) {
			return;
		}

		this.preloadedEvents.push(slug);

		return this.eventBySlugGQL
			.watch({
				filter: { slug },
			})
			.valueChanges.subscribe();
	}
}
