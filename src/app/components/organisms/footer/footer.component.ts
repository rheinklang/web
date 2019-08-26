import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { VERSION, HASH } from '../../../../environments/version';

@Component({
	selector: 'rk-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	public get year() {
		return new Date().getFullYear();
	}

	public get build() {
		return `v${VERSION} ${HASH}`;
	}
}
