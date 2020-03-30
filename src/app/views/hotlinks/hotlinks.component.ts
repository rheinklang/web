import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HotlinksService } from '../../services/hotlinks.service';
import { HotlinkSchema, ParsedHotlinkSchema } from '../../schema/HotlinkSchema';
import { generateUrchingTrackingURL } from '../../utils/utm';
import { LogService } from '../../services/log.service';

@Component({
	selector: 'rk-hotlinks',
	templateUrl: './hotlinks.component.html',
	styleUrls: ['./hotlinks.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HotlinksComponent implements OnInit {
	public hotlinks: ParsedHotlinkSchema[] = [];

	constructor(private hotlinksService: HotlinksService, private logService: LogService) {}

	public ngOnInit() {
		this.hotlinksService.getHotlinks().subscribe((hotlinks) => {
			this.hotlinks = hotlinks;
		});
	}

	public generateTrackableURL(url: string, internal = false) {
		return internal ? url : generateUrchingTrackingURL(url, 'hotlinks');
	}
}
