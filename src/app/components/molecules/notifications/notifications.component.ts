import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../services/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'rk-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
	public latestNotification: any;

	constructor(private messaging: MessagingService, private snackbar: MatSnackBar) {}

	ngOnInit() {
		this.messaging.currentMessage.subscribe((message) => {
			console.log(message);
			// this.snackbar.open(ERROR_NOTIFICATION_CONTENT, ERROR_NOTIFICATION_ACTION, {
			// 	duration: 10000,
			// });
		});
	}
}
