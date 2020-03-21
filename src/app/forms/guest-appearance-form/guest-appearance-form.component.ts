import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EXPR_URL } from '../../utils/validation';
import { FormsService } from '../../services/forms.service';
import { SlackService } from '../../services/slack.service';
import { FORMS_GUEST_APPEARANCE } from '../../config/forms';
import { RemoteLogService } from '../../services/remote-log.service';

@Component({
	selector: 'rk-guest-appearance-form',
	templateUrl: './guest-appearance-form.component.html',
	styleUrls: ['./guest-appearance-form.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GuestAppearanceFormComponent {
	public genres = [
		'Indie Dance',
		'Deep House',
		'Dub House',
		'Tech-House',
		'Melodic House & Techno',
		'Techno',
		'Andere ...',
	];
	public submitting = false;
	public sent: boolean | null = null;

	constructor(
		private formsService: FormsService,
		private slackService: SlackService,
		private logService: RemoteLogService
	) {}

	public guestAppearanceForm = new FormGroup({
		year: new FormControl({
			value: `${new Date().getFullYear()}`,
			disabled: true,
		}),
		location: new FormControl('', Validators.required),
		mail: new FormControl('', Validators.required),
		age: new FormControl('', [Validators.required, Validators.min(16)]),
		artistName: new FormControl('', Validators.required),
		genre: new FormControl('', Validators.required),
		specificGenre: new FormControl(''),
		termsAccepted: new FormControl('', [Validators.requiredTrue]),
		mixtapeLink: new FormControl('', [Validators.required, Validators.pattern(EXPR_URL)]),
	});

	public onSubmit() {
		this.submitting = true;

		this.formsService.submit(FORMS_GUEST_APPEARANCE, this.guestAppearanceForm.value).subscribe(
			() => {
				this.sent = true;
				this.submitting = false;

				this.slackService
					.send({
						blocks: [
							this.slackService.buildTextBlock(`:tada: Guest DJ contest submission received`),
							{
								type: 'section',
								fields: this.slackService.buildFields(this.guestAppearanceForm.value) as any,
							},
							this.slackService.context,
						],
					})
					.subscribe();
			},
			(err) => {
				this.sent = false;
				this.submitting = false;
				this.logService.traceError('GuestAppearanceSubmission', err);
			}
		);
	}
}
