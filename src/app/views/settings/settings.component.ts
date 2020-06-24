import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { SettingsService, UserSettings } from '../../services/settings.service';
import { SettingsSingletonGQLResponse } from '../../queries/settings.singleton';
import { FormControl, Validators } from '@angular/forms';

type PageData =
	| SettingsSingletonGQLResponse['settingsPageSingleton']
	| Partial<SettingsSingletonGQLResponse['settingsPageSingleton']>;

@Component({
	selector: 'rk-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
	public pageData: PageData = {};
	public userSettings: UserSettings = {
		pushToken: undefined,
		newsletterAddress: undefined,
	};
	public newsletterActive = false;
	public email = new FormControl('', {
		validators: [Validators.email],
	});

	constructor(private messaging: MessagingService, private settings: SettingsService) {}

	ngOnInit() {
		this.settings.getSingleton().subscribe((pageData) => {
			this.pageData = pageData;
		});

		this.settings.getUserSettings().subscribe((settings) => {
			if (settings) {
				this.userSettings = settings;
			}
		});
	}

	public setNotificationStatus(event: { checked: boolean }) {
		if (event.checked) {
			this.messaging.requestPermission();
		} else if (!!this.userSettings.pushToken) {
			this.messaging.unsubscribe();
			this.settings.unsubscribeToPushNotifications(this.userSettings.pushToken);
		}
	}

	public setNewsletterStatus(event: { checked: boolean }) {
		if (event.checked) {
			this.newsletterActive = event.checked;
		} else if (this.userSettings.newsletterAddress) {
			this.settings.unsubscribeToNewsletter(this.userSettings.newsletterAddress);
		}
	}

	public confirmNewsletterSubscription() {
		this.settings.subscribeToNewsletter(this.email.value);
	}
}
