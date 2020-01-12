import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'rk-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	public eventId: string;

	constructor(private route: ActivatedRoute) {}

	public ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.eventId = params.get('eventId');
		});
	}
}
