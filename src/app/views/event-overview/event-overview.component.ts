import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { of, zip, from } from 'rxjs';
import { mergeMap, groupBy, toArray } from 'rxjs/operators';
import { EventsService } from '../../services/events.service';
import { EventsGQLEntry } from '../../queries/Events.query';

@Component({
	selector: 'rk-event-overview',
	templateUrl: './event-overview.component.html',
	styleUrls: ['./event-overview.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class EventOverviewComponent implements OnInit {
	public events: Array<{ year: string, events: EventsGQLEntry[] }> = [];
	public pageData?: {
		title: string;
		description: string;
	};

	constructor(private eventsService: EventsService) { }

	ngOnInit() {
		this.eventsService.getEvents().subscribe(events => {
			from(events).pipe(
				groupBy(event => event.date.split('-')[0]),
				mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
			).subscribe(([year, correspondingEvents]) => {
				const sortedEvents = correspondingEvents.sort((a, b) => {
					return new Date(a.date).getTime() - new Date(b.date).getTime()
				});

				this.events.push({
					year,
					events: sortedEvents
				});
			});
		});

		this.eventsService.getEventsSingleton().subscribe(pageData => {
			this.pageData = pageData;
		});
	}

	public get eventGroupIcon() {
		return {
			select: 'navigation',
			color: '#000',
			height: '32px',
			width: '32px'
		};
	}

}
