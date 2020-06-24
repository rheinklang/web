import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable, of } from 'rxjs';
import { map, merge } from 'rxjs/operators';

import { SettingsSingletonGQL } from '../queries/settings.singleton';
import { SlackService } from './slack.service';
import { FormsService } from './forms.service';
import { FORMS_NEWSLETTER, FORMS_PUSH_TOKENS } from '../config/forms';

export interface UserSettings {
	pushToken?: string | null;
	newsletterEnabled?: boolean | null;
	newsletterAddress?: string | null;
}

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	constructor(
		private settingsGQL: SettingsSingletonGQL,
		private storage: Storage,
		private slack: SlackService,
		private forms: FormsService
	) {}

	public getSingleton() {
		return this.settingsGQL.watch().valueChanges.pipe(map((res) => res.data.settingsPageSingleton));
	}

	public getUserSettings(): Observable<UserSettings> {
		return from(this.storage.get('rk-user-settings'));
	}

	public persistUserSettings(settings: Partial<UserSettings>) {
		return this.getUserSettings().subscribe((data) => {
			return from(
				this.storage.set('rk-user-settings', {
					...data,
					...settings,
				})
			);
		});
	}

	// push notifications

	public subscribeToPushNotifications(token: string) {
		return this.forms
			.submit(
				FORMS_PUSH_TOKENS,
				{
					token,
				},
				'push-notification'
			)
			.subscribe(() => {
				return this.persistUserSettings({
					pushToken: token,
				});
			});
	}

	public unsubscribeToPushNotifications(token: string) {
		return this.getUserSettings().subscribe((settings) => {
			if (!settings || !settings.pushToken) {
				return of(null);
			}

			this.persistUserSettings({
				pushToken: null,
			});

			this.slack.send({
				blocks: [this.slack.buildTextBlock(`Unsubscribe notification token \`${token}\``)],
			});
		});
	}

	// newsletter

	public subscribeToNewsletter(mail: string) {
		return this.forms
			.submit(
				FORMS_NEWSLETTER,
				{
					mail,
				},
				'newsletter'
			)
			.subscribe(() => {
				return this.persistUserSettings({
					newsletterEnabled: true,
					newsletterAddress: mail,
				});
			});
	}

	public unsubscribeToNewsletter(mail: string) {
		return this.getUserSettings().subscribe((settings) => {
			if (!settings || !settings.newsletterAddress) {
				return of(null);
			}

			this.persistUserSettings({
				// newsletterAddress: null, TODO: Keep the address in store
				newsletterEnabled: false,
			});

			this.slack.send({
				blocks: [this.slack.buildTextBlock(`Unsubscribe newsletter for ${mail}`)],
			});
		});
	}
}
