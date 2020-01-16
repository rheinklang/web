import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EventType } from '../../../types/Event';
import { EventSchema } from '../../../schema/EventSchema';

@Component({
	selector: 'rk-teaser-event',
	templateUrl: './teaser-event.component.html',
	styleUrls: ['./teaser-event.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TeaserEventComponent {
	@Input() public slug: EventSchema['slug'];
	@Input() public title: EventSchema['title'];
	@Input() public date: EventSchema['date'];
	@Input() public link: EventSchema['link'];
	@Input() public linkType: EventSchema['linkType'];
	@Input() public facebookUrl: EventSchema['facebookUrl'];
	@Input() public description: EventSchema['description'];
	@Input() public type: EventSchema['type'];
	@Input() public previewImage: EventSchema['previewImage'];
	@Input() public secret: EventSchema['secret'];
	@Input() public tickets: EventSchema['tickets'];
	@Input() public location: EventSchema['location'];

	public get hasLocation() {
		return this.location && this.location.name && this.location.city && this.location.country;
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
		};
	}
}
