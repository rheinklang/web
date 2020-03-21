import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DSGVOService } from '../../../services/dsgvo.service';
import { CookieService } from '../../../services/cookie.service';
import { DSGVOSingletonGQLResponse } from '../../../queries/DSGVO.singleton';
import { createExpirationDate } from '../../../utils/date';
import { trackGTMEvent } from '../../../utils/gtag';

export const PRIVACY_TERMS_KEY = 'rheinklangPrivacyTermsAccepted';

type DSGVOData = DSGVOSingletonGQLResponse['dsgvoSingleton'];

@Component({
	selector: 'rk-privacy-banner',
	templateUrl: './privacy-banner.component.html',
	styleUrls: ['./privacy-banner.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class PrivacyBannerComponent implements OnInit {
	public data: DSGVOData = {} as DSGVOData;

	// we assume that we do not need to show the banner initially
	// and we'll check the cookies on initialization.
	public accepted = true;

	constructor(private dsgvoService: DSGVOService, private cookieService: CookieService) {}

	ngOnInit() {
		this.dsgvoService.getSingleton().subscribe((data) => {
			this.data = data;
			// we require the DSGVO ID for invalidation purposes
			this.initializeStateBasedOnCookie();
		});
	}

	public acceptTerms() {
		this.cookieService.set({
			name: PRIVACY_TERMS_KEY,
			value: this.acceptedCookieValue,
			expires: createExpirationDate(new Date(), 182),
			sameSite: 'Lax',
		});

		this.accepted = true;

		trackGTMEvent('accept_terms', {
			category: 'privacy',
			label: 'DSGVO accepted',
			value: `Terms accepted on ${new Date()}`,
		});
	}

	private initializeStateBasedOnCookie() {
		const cookieExists = this.cookieService.check(PRIVACY_TERMS_KEY);
		const cookieValue = this.cookieService.get(PRIVACY_TERMS_KEY);

		if (cookieExists && cookieValue === this.acceptedCookieValue) {
			// terms accepted, do nothing
			return;
		}

		// terms not accepted yet, show banner
		this.accepted = false;
	}

	private get acceptedCookieValue() {
		return `${this.data.id}; true;`;
	}
}
