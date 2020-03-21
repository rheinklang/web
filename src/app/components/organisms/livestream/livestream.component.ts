import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveStreamService } from '../../../services/livestream.service';
import { LiveStreamSchema } from '../../../schema/LiveStreamSchema';

const PARENT_STREAM_HOST = 'rheinklang-festival.ch';
const TWITCH_PLAYER_HOST = 'https://player.twitch.tv';

@Component({
	selector: 'rk-livestream',
	templateUrl: './livestream.component.html',
	styleUrls: ['./livestream.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LivestreamComponent implements OnInit {
	// basic UI settings
	@Input() public width = 1280;
	@Input() public height = 720;

	// meta settings
	@Input() public autoplay = true;

	private liveStreamInfo: LiveStreamSchema = {
		enabled: false,
		startDate: '',
		startTime: '',
		duration: '',
		channel: '',
	};

	constructor(private liveStreamService: LiveStreamService, private sanitizer: DomSanitizer) {}

	ngOnInit() {
		this.liveStreamService.getLiveStream().subscribe((data) => {
			this.liveStreamInfo = data;
		});
	}

	public get isStreamAvailable() {
		return this.liveStreamInfo.enabled === true;
	}

	public get embeddableStreamURL() {
		let url = `${TWITCH_PLAYER_HOST}/?${this.streamIdentifier}&parent=${PARENT_STREAM_HOST}`;
		if (this.autoplay) {
			url += `?autoplay=true`;
		}

		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	private get streamIdentifier() {
		if (this.liveStreamInfo.channel) {
			return `channel=${this.liveStreamInfo.channel}`;
		}

		// other types not supported yet
		return '';
	}
}
