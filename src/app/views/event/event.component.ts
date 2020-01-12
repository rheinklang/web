import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventBySlugGQLEntry } from '../../queries/EventBySlug.query';
import { generateUrchingTrackingURL } from '../../utils/utm';

@Component({
	selector: 'rk-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	public eventSlug: string;
	public event: EventBySlugGQLEntry;

	constructor(
		private route: ActivatedRoute,
		private eventsService: EventsService
	) { }

	public ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.eventSlug = params.get('eventSlug');

			this.eventsService.getEventBySlug(this.eventSlug).subscribe(event => {
				this.event = event;
			});
		});
	}

	public get shopLink() {
		return this.event && this.event.tickets && this.event.tickets.externalShopLink
			? generateUrchingTrackingURL(this.event.tickets.externalShopLink, this.event.title)
			: null;
	}

	public get facebookLink() {
		return this.event && this.event.facebookUrl
			? generateUrchingTrackingURL(this.event.facebookUrl, this.event.title)
			: null;
	}
}
