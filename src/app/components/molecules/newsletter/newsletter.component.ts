import { Component } from '@angular/core';

@Component({
	selector: 'rk-newsletter',
	templateUrl: './newsletter.component.html',
	styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
	public targetNewsletterAddress: string;

	public setNewsletterAddress(value: string) {
		this.targetNewsletterAddress = value;
	}

	public submitNewsletterSubscription() {
		alert(this.targetNewsletterAddress);
	}
}
