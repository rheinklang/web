import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var FB;

@Component({
	selector: 'rk-facebook-messenger-integration',
	templateUrl: './facebook-messenger-integration.component.html',
	styleUrls: ['./facebook-messenger-integration.component.scss'],
})
export class FacebookMessengerIntegrationComponent implements OnInit {
	public ngOnInit() {
		(window as any).fbAsyncInit = () => {
			FB.init({
				xfbml: true,
				version: 'v8.0',
			});
		};

		((d, s, id) => {
			let js: HTMLScriptElement;
			const fjs = d.getElementsByTagName(s)[0];

			if (d.getElementById(id)) {
				return;
			}

			js = d.createElement(s) as HTMLScriptElement;
			js.id = id;
			js.src = 'https://connect.facebook.net/de_DE/sdk/xfbml.customerchat.js';
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');
	}

	public get facebookPageId() {
		return environment.facebookPageId;
	}

	public get messengerRefId() {
		// TODO: maybe introduce active route ID
		return 'website';
	}
}
