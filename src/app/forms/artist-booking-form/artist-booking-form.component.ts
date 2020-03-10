import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORMS_ARTIST_BOOKING } from '../../config/forms';
import { pluralize } from '../../utils/templating';
import { SlackService } from '../../services/slack.service';
import { FormsService } from '../../services/forms.service';
import { RemoteLogService } from '../../services/remote-log.service';
import { ArtistsService, BookableArtistsForDropdown } from '../../services/artists.service';

const visibleAgencies = ['Waehlscheibe', 'Beyond Souls', 'Schwarzmatt', 'Rheinklang'];

@Component({
	selector: 'rk-artist-booking-form',
	templateUrl: './artist-booking-form.component.html',
	styleUrls: ['./artist-booking-form.component.scss']
})
export class ArtistBookingFormComponent implements OnInit {
	public bookableArtists: BookableArtistsForDropdown[] = [];
	public bookableArtistsNames: string[] = [];
	public submitting = false;
	public sent: boolean | null = null;
	public artistBookingForm = new FormGroup({
		mail: new FormControl('', [Validators.required, Validators.email]),
		date: new FormControl('', Validators.required),
		location: new FormControl('', Validators.required),
		artist: new FormControl('', Validators.required),
		offer: new FormControl('', Validators.required),
		live: new FormControl(''),
		termsAccepted: new FormControl('', [Validators.requiredTrue]),
		presskitURL: new FormControl(''),
		message: new FormControl('')
	});

	constructor(
		private formsService: FormsService,
		private slackService: SlackService,
		private logService: RemoteLogService,
		private artistsService: ArtistsService
	) {}

	public ngOnInit() {
		this.artistsService.getBookableArtistsDropdownList().subscribe(list => {
			this.bookableArtists = list;
			this.bookableArtistsNames = list
				.filter(artist => visibleAgencies.indexOf(artist.agency) > -1)
				.map(artist => artist.name)
				.sort();
		});
	}

	public onSubmit() {
		this.submitting = true;

		this.formsService.submit(FORMS_ARTIST_BOOKING, this.artistBookingForm.value).subscribe(
			() => {
				this.sent = true;
				this.submitting = false;

				this.slackService
					.send({
						blocks: [
							this.slackService.buildTextBlock(`:tada: Artist booking request received`),
							{
								type: 'section',
								fields: this.slackService.buildFields(this.artistBookingForm.value) as any
							},
							this.slackService.context
						]
					})
					.subscribe();
			},
			err => {
				this.sent = false;
				this.submitting = false;
				this.logService.traceError('ArtistBookingSubmission', err);
			}
		);
	}

	public get isAbleToPlayLive() {
		const artistInfo = this.getArtistByName(this.artistBookingForm.value.artist);
		return artistInfo && artistInfo.live === true;
	}

	public get offerHint() {
		if (!this.artistBookingForm.value.artist) {
			return '';
		}

		const artistInfo = this.getArtistByName(this.artistBookingForm.value.artist);

		if (!artistInfo) {
			return '';
		}

		const flightDeparture = artistInfo.flightDepartureLocation;

		return [
			'Exklusiv ',
			pluralize(artistInfo.flights, `Flug (${flightDeparture}), `, `Flüge (${flightDeparture}), `),
			pluralize(artistInfo.hotelAmount, 'Hotelübernachtung, ', 'Hotelübernachtungen, '),
			pluralize(artistInfo.transferAmount, 'Transfer, ', 'Transfers, '),
			pluralize(artistInfo.mealAmount, 'Mahlzeit ', 'Mahlzeiten '),
			` lokale Gebühren (Booking via ${artistInfo.agency}).`
		].join('');
	}

	private getArtistByName(name: string): BookableArtistsForDropdown | void {
		return this.bookableArtists.find(artist => artist.name === name);
	}
}
