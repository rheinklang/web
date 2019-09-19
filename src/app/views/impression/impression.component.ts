import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'rk-impression',
	templateUrl: './impression.component.html',
	styleUrls: ['./impression.component.scss']
})
export class ImpressionComponent implements OnInit {
	public impressionId: string;

	constructor(private route: ActivatedRoute) { }

	public ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.impressionId = params.get('impressionId');
		});
	}

}
