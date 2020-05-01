import { Component } from '@angular/core';
import { FormsService } from '../../services/forms.service';
import { SlackService } from '../../services/slack.service';
import { RemoteLogService } from '../../services/remote-log.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FORMS_SUPPLIER } from '../../config/forms';

@Component({
	selector: 'rk-supplier-form',
	templateUrl: './supplier-form.component.html',
	styleUrls: ['./supplier-form.component.scss'],
})
export class SupplierFormComponent {
	public supplyType = [
		'Food',
		'Infrastruktur',
		'Personal',
		'Sponsoring',
		'Medien & Kommunikation',
		'Andere ...',
	];
	public submitting = false;
	public sent: boolean | null = null;

	constructor(
		private formsService: FormsService,
		private slackService: SlackService,
		private logService: RemoteLogService
	) {}

	public supplierForm = new FormGroup({
		year: new FormControl({
			value: `${new Date().getFullYear()}`,
			disabled: true,
		}),
		company: new FormControl('', Validators.required),
		mail: new FormControl('', Validators.required),
		website: new FormControl(''),
		type: new FormControl('', Validators.required),
		specificType: new FormControl(''),
		message: new FormControl('', Validators.required),
		termsAccepted: new FormControl('', [Validators.requiredTrue]),
	});

	public onSubmit() {
		this.submitting = true;

		this.formsService.submit(FORMS_SUPPLIER, this.supplierForm.value).subscribe(
			() => {
				this.sent = true;
				this.submitting = false;

				this.slackService
					.send({
						blocks: [
							this.slackService.buildTextBlock(`:tada: Supplier submission received`),
							{
								type: 'section',
								fields: this.slackService.buildFields(this.supplierForm.value) as any,
							},
							this.slackService.context,
						],
					})
					.subscribe();
			},
			(err) => {
				this.sent = false;
				this.submitting = false;
				this.logService.traceError('SupplierSubmission', err);
			}
		);
	}
}
