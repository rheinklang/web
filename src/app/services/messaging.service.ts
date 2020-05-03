import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, from } from 'rxjs';
import { FormsService } from './forms.service';
import { IPService } from './ip.service';
import { Storage } from '@ionic/storage';
import { FORMS_PUSH_TOKENS } from '../config/forms';
import { LogService } from './log.service';

@Injectable({
	providedIn: 'root',
})
export class MessagingService {
	public currentMessage = new BehaviorSubject(null);

	constructor(
		private angularFireMessaging: AngularFireMessaging,
		private forms: FormsService,
		private storage: Storage,
		private log: LogService
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
				from(this.storage.get('rk-firebase-push-token')).subscribe((existingToken?: string) => {
					if (!existingToken) {
						// only register new token if not already registered
						this.forms
							.submit(
								FORMS_PUSH_TOKENS,
								{
									token,
								},
								'notification-subscription'
							)
							.subscribe(() => {
								// save token also in local websql blob for faster checks
								this.storage.set('rk-firebase-push-token', token);
							});
					}
				});
			},
			(err) => {
				this.log.traceError(err);
			}
		);
	}

	public receiveMessage() {
		this.angularFireMessaging.messages.subscribe((payload) => {
			console.log('new message received.', payload);
			this.currentMessage.next(payload);
		});
	}
}
