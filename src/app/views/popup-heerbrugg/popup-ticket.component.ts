import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { toDataURL } from 'qrcode';
import { unsubscribe } from '../../utils/subscription';
import { PopupService } from '../../services/popup.service';
import { ActivatedRoute } from '@angular/router';
import { IPopupEntrySchema } from '../../schema/PopupEntrySchema';

@Component({
	selector: 'rk-popup',
	templateUrl: './popup-ticket.component.html',
	styleUrls: ['./popup-ticket.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class PopupTicketComponent implements OnInit, OnDestroy {
	public isAllowed = false;
	public isLoaded = false;
	public qrCodeURL: string;

	private guest?: IPopupEntrySchema;
	private guestSub$: Subscription;

	constructor(private route: ActivatedRoute, private popupService: PopupService) {}

	public ngOnInit() {
		const guid = this.route.snapshot.paramMap.get('guid');
		this.guestSub$ = this.popupService.getGuestByGUID(guid).subscribe((guest) => {
			this.isLoaded = true;
			this.guest = guest;

			if (guest) {
				this.isAllowed = true;

				toDataURL(`${guest.surname} ${guest.lastname} (${guest.guid})`, {
					errorCorrectionLevel: 'H',
					scale: 4,
					color: {
						dark: '#ffffff',
						light: '#000000',
					},
				})
					.then((url) => {
						this.qrCodeURL = url;
					})
					.catch(() => {
						// do nothing
					});
			}
		});
	}

	public ngOnDestroy() {
		unsubscribe([this.guestSub$]);
	}

	public get eventId() {
		return `PopUp Event #${this.guest.eventId}`;
	}

	public get guid() {
		return this.guest.guid;
	}

	public get name() {
		return `${this.guest.surname} ${this.guest.lastname}`;
	}
}
