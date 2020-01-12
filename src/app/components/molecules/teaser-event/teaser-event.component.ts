import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EventsGQLEntry } from '../../../queries/Events.query';
import { EventType } from '../../../types/Event';
import { generateUrchingTrackingURL } from '../../../utils/utm';

@Component({
	selector: 'rk-teaser-event',
	templateUrl: './teaser-event.component.html',
	styleUrls: ['./teaser-event.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TeaserEventComponent {
	@Input() public slug: EventsGQLEntry['slug'];
	@Input() public title: EventsGQLEntry['title'];
	@Input() public date: EventsGQLEntry['date'];
	@Input() public link: EventsGQLEntry['link'];
	@Input() public linkType: EventsGQLEntry['linkType'];
	@Input() public facebookUrl: EventsGQLEntry['facebookUrl'];
	@Input() public description: EventsGQLEntry['description'];
	@Input() public type: EventsGQLEntry['type'];
	@Input() public previewImage: EventsGQLEntry['previewImage'];
	@Input() public secret: EventsGQLEntry['secret'];
	@Input() public tickets: EventsGQLEntry['tickets'];
	@Input() public location: EventsGQLEntry['location'];

	public get hasLocation() {
		return this.location.name && this.location.city && this.location.country;
	}

	public get fqLocationName() {
		return `${this.location.name}, ${this.location.city} (${this.location.country})`;
	}

	public get isFestival() {
		return this.type === EventType.FESTIVAL;
	}

	public get isDayDance() {
		return this.type === EventType.DAYDANCE;
	}

	public get isCooperation() {
		return this.type === EventType.COOPERATION;
	}

	public get readableEventType() {
		switch (this.type) {
			case EventType.FESTIVAL:
				return 'Festival (Tag- & Nacht)';
			case EventType.DAYDANCE:
				return 'DayDance';
			case EventType.COOPERATION:
				return 'Kooperation';
			default:
				return null;
		}
	}

	public get hasTickets() {
		return this.tickets && this.tickets.enabled !== null;
	}

	public get eventDetailURL() {
		return [`/events/${this.slug}`];
	}

	public get eventDetailText() {
		if (this.hasTickets) {
			return `Details & Tickets`;
		}

		return 'Details';
	}

	public get eventDetailIcon() {
		return {
			select: this.hasTickets ? 'credit-card' : 'eye',
			color: '#fff'
		}
	}
}
