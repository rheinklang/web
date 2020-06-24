import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, from, of } from 'rxjs';
import { FormsService } from './forms.service';
import { IPService } from './ip.service';
import { Storage } from '@ionic/storage';
import { FORMS_PUSH_TOKENS } from '../config/forms';
import { LogService } from './log.service';
import { SlackService } from './slack.service';
import { SettingsService } from './settings.service';

@Injectable({
	providedIn: 'root',
})
export class MessagingService {
	public currentMessage = new BehaviorSubject(null);

	constructor(
		private angularFireMessaging: AngularFireMessaging,
		private forms: FormsService,
		private log: LogService,
		private settings: SettingsService,
		private slack: SlackService
	) {
		this.angularFireMessaging.messaging.subscribe((messaging) => {
			messaging.onMessage = messaging.onMessage.bind(messaging);
			messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
		});
	}

	public getToken() {
		return this.angularFireMessaging.getToken;
	}

	public requestPermission() {
		this.angularFireMessaging.requestToken.subscribe(
			(token) => {
				console.log('Token:', token);
				this.settings.getUserSettings().subscribe((settings) => {
					if (!settings || !settings.pushToken) {
						return this.settings.subscribeToPushNotifications(token);
					}
				});
			},
			(err) => {
				this.log.traceError(err);
			}
		);
	}

	public unsubscribe() {
		this.getToken().subscribe((token) => {
			if (token) {
				this.angularFireMessaging.deleteToken(token);
				this.settings.unsubscribeToPushNotifications(token);
			}
		});
	}

	public receiveMessage() {
		this.angularFireMessaging.messages.subscribe((payload) => {
			console.log('new message received.', payload);
			this.currentMessage.next(payload);
		});
	}
}
