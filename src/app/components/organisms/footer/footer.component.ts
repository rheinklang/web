import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { VERSION, HASH } from '../../../../environments/version';
import { generateUrchingTrackingURL } from '../../../utils/utm';
import { SCM_REPO } from '../../../utils/scm';

@Component({
	selector: 'rk-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	public get year() {
		return new Date().getFullYear();
	}

	public get build() {
		return `v${VERSION} ${HASH}`;
	}

	/**
	 * Generated with obfuscator
	 * @see http://www.jottings.com/obfuscator/
	 */
	public get contactMailLink() {
		const coded = '2sPPp@12QVPQF.Z2';
		const key = 'EcPygNirGnWTh9Rq8ZYwFLu1eQ5o23H0CUv6k7xbsOSpjdJMlmztVIfAXa4KBD';
		const shift = coded.length;
		let link = '';
		let ltr;

		for (let i = 0; i < coded.length; i++) {
			// tslint:disable-next-line: triple-equals
			if (key.indexOf(coded.charAt(i)) == -1) {
				ltr = coded.charAt(i);
				link += ltr;
			} else {
				ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length;
				link += key.charAt(ltr);
			}
		}

		return `mailto:${link}`;
	}

	public trackableURL(value: string) {
		return generateUrchingTrackingURL(value, 'footer_links');
	}

	public get issueURL() {
		return `${SCM_REPO}/issues/new?&labels=bug&template=--bug-report.md&title=[${this.build}]%20Issue%20Title...`;
	}
}
