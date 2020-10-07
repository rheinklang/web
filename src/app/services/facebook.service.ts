import { Injectable } from '@angular/core';

declare var FB;

@Injectable({
	providedIn: 'root',
})
export class FacebookService {
	attachAsyncInit() {
		(window as any).fbAsyncInit = () => {
			FB.init({
				xfbml: true,
				version: 'v8.0',
			});
		};
	}

	loadCustomerMessengerWidget() {
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
}
