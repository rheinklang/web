import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { of, zip, from, Subscription } from 'rxjs';
import { mergeMap, groupBy, toArray } from 'rxjs/operators';
import { EventsService } from '../../services/events.service';
import { EventsGQLEntry } from '../../queries/Events.query';
import { unsubscribe } from '../../utils/subscription';

@Component({
	selector: 'rk-event-overview',
	templateUrl: './event-overview.component.html',
	styleUrls: ['./event-overview.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EventOverviewComponent implements OnInit, OnDestroy {
	public events: Array<{ year: string; events: EventsGQLEntry[] }> = [];
	public pageData?: {
		title: string;
		description: string;
	};

	private eventsSub$: Subscription | undefined;
	private eventsSortSub$: Subscription | undefined;

	constructor(private eventsService: EventsService) {}

	ngOnInit() {
		this.eventsService.getEvents().subscribe((events) => {
			from(events)
				.pipe(
					groupBy((event) => event.date.split('-')[0]),
					mergeMap((group) => zip(of(group.key), group.pipe(toArray())))
				)
				.subscribe(([year, correspondingEvents]) => {
					const sortedEvents = correspondingEvents.sort((a, b) => {
						return new Date(a.date).getTime() - new Date(b.date).getTime();
					});

					this.events.push({
						year,
						events: sortedEvents,
					});
				});
		});

		this.eventsService.getEventsSingleton().subscribe((pageData) => {
			this.pageData = pageData;
		});
	}

	ngOnDestroy() {
		unsubscribe([this.eventsSub$, this.eventsSortSub$]);
	}

	public get eventGroupIcon() {
		return {
			select: 'navigation',
			color: '#000',
			height: '32px',
			width: '32px',
		};
	}
}
