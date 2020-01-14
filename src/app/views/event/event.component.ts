import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventBySlugGQLEntry } from '../../queries/EventBySlug.query';
import { generateUrchingTrackingURL } from '../../utils/utm';
import { unsubscribe } from '../../utils/subscription';
import { Subscription } from 'rxjs';

@Component({
	selector: 'rk-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
	public eventSlug: string;
	public event: EventBySlugGQLEntry;

	private routeSub$: Subscription;
	private eventSub$: Subscription;

	constructor(private route: ActivatedRoute, private eventsService: EventsService) {}

	public ngOnInit() {
		this.routeSub$ = this.route.paramMap.subscribe(paramMap => {
			console.log(paramMap);

			if (!paramMap.has('eventSlug')) {
				// skip if no event slug is present
				return;
			}

			this.eventSlug = paramMap.get('eventSlug');
			this.eventSub$ = this.eventsService.getEventBySlug(this.eventSlug).subscribe(event => {
				this.event = event;
			});
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.routeSub$, this.eventSub$]);
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
