import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactSingletonGQLResponse, ContactSingletonGQL } from '../../queries/Contact.singleton';
import { template } from '../../utils/templating';

@Component({
	selector: 'rk-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
	public pageData: Partial<ContactSingletonGQLResponse['contactsPageSingleton']> = {};

	private titleTemplateData = {
		year: new Date().getFullYear(),
	};

	constructor(private contactService: ContactService) {}

	public ngOnInit() {
		this.contactService.getSingleton().subscribe((res) => {
			if (res) {
				this.pageData = res;
			}
		});
	}

	public get guestSubmissionTitle() {
		return template(this.pageData.guestAppearanceSubmissionTitle, this.titleTemplateData);
	}

	public get supplierSubmissionTitle() {
		return template(this.pageData.supplierSubmissionTitle, this.titleTemplateData);
	}

	public get teamSubmissionTitle() {
		return template(this.pageData.teamSubmissionTitle, this.titleTemplateData);
	}

	public get artistBookingSubmissionTitle() {
		return template(this.pageData.artistBookingSubmissionTitle, this.titleTemplateData);
	}
}
