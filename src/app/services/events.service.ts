import { Injectable } from '@angular/core';
import { EventsGQL } from '../queries/Events.query';
import { EventBySlugGQL } from '../queries/EventBySlug.query';
import { map, flatMap, first } from 'rxjs/operators';
import { CACHED_POLICY } from '../config/policies';
import { EventsSingletonGQL } from '../queries/Events.singleton';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	constructor(
		private eventsGQL: EventsGQL,
		private eventBySlugGQL: EventBySlugGQL,
		private eventsSingletonGQL: EventsSingletonGQL
	) { }

	public getEvents() {
		return this.eventsGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY
			})
			.valueChanges.pipe(map(v => v.data.eventsCollection));
	}

	public getEventsSingleton() {
		return this.eventsSingletonGQL
			.watch(undefined, {
				fetchPolicy: CACHED_POLICY
			})
			.valueChanges.pipe(map(v => v.data.eventsPageSingleton));
	}

	public getEventBySlug(slug: string) {
		return this.eventBySlugGQL
			.watch(
				{
					filter: { slug }
				},
				{
					fetchPolicy: CACHED_POLICY
				}
			)
			.valueChanges.pipe(
				map(res => res.data.eventsCollection),
				flatMap(entry => entry),
				first()
			);
	}
}
