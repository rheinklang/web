import { Component, OnInit } from '@angular/core';
import { DSGVOService } from '../../services/dsgvo.service';

@Component({
	selector: 'rk-privacy',
	templateUrl: './privacy.component.html',
	styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
	public content = '';

	constructor(private dsgvoService: DSGVOService) {}

	ngOnInit() {
		this.dsgvoService.getSingleton().subscribe((data) => {
			this.content = data.content;
		});
	}
}
