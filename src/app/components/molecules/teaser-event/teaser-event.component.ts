import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EventsGQLEntry } from '../../../queries/Events.query';

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
}
