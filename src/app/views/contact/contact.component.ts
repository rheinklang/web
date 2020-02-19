import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactSingletonGQLResponse } from '../../queries/Contact.singleton';

@Component({
	selector: 'rk-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	public pageData: Partial<ContactSingletonGQLResponse['contactsPageSingleton']> = {};

	constructor(private contactService: ContactService) {}

	public ngOnInit() {
		this.contactService.getSingleton().subscribe(res => {
			if (res) {
				this.pageData = res;
			}
		});
	}

	public get guestSubmissionTitle() {
		return `Gastauftritt ${new Date().getFullYear()}`;
	}

	public get supplierSubmissionTitle() {
		return `Aussteller ${new Date().getFullYear()}`;
	}
}
