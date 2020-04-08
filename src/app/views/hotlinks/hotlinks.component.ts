import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HotlinksService } from '../../services/hotlinks.service';
import { ParsedHotlinkSchema } from '../../schema/HotlinkSchema';
import { generateUrchingTrackingURL } from '../../utils/utm';
import { trackGTMEvent } from '../../utils/gtag';

@Component({
	selector: 'rk-hotlinks',
	templateUrl: './hotlinks.component.html',
	styleUrls: ['./hotlinks.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HotlinksComponent implements OnInit {
	public hotlinks: ParsedHotlinkSchema[] = [];

	constructor(private hotlinksService: HotlinksService) {}

	public ngOnInit() {
		this.hotlinksService.getHotlinks().subscribe((hotlinks) => {
			this.hotlinks = hotlinks;
		});
	}

	public generateTrackableURL(url: string, internal = false) {
		return internal ? url : generateUrchingTrackingURL(url, 'hotlinks');
	}

	public trackInternalLink(hl: ParsedHotlinkSchema) {
		trackGTMEvent('hotlink_click', {
			category: 'service',
			label: hl.label,
			value: hl.url,
		});
	}

	public trackExternalLink(hl: ParsedHotlinkSchema) {
		trackGTMEvent('leap', {
			category: 'link',
			label: hl.label,
			value: hl.url,
		});
	}
}
