import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORMS_TEAM } from '../../config/forms';
import { FormsService } from '../../services/forms.service';
import { SlackService } from '../../services/slack.service';
import { RemoteLogService } from '../../services/remote-log.service';

@Component({
	selector: 'rk-team-form',
	templateUrl: './team-form.component.html',
	styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
	public jobs = [
		'Generalist',
		'Auf- und Abbau',
		'Verpflegung',
		'Getränkeausschank',
		'PR & Kommunikation',
		'Design',
		'Audio Infrastruktur',
		'Booking Management',
		'Investor',
		'Andere ...'
	];
	public submitting = false;
	public sent: boolean | null = null;

	constructor(
		private formsService: FormsService,
		private slackService: SlackService,
		private logService: RemoteLogService
	) { }

	public teamForm = new FormGroup({
		year: new FormControl({
			value: `${new Date().getFullYear()}`,
			disabled: true
		}),
		name: new FormControl('', Validators.required),
		location: new FormControl('', Validators.required),
		age: new FormControl('', [Validators.required, Validators.min(18)]),
		mail: new FormControl('', Validators.required),
		telephone: new FormControl(''),
		job: new FormControl('', Validators.required),
		message: new FormControl(''),
		termsAccepted: new FormControl('', [Validators.requiredTrue]),
	});

	public onSubmit() {
		this.submitting = true;

		this.formsService
			.submit(FORMS_TEAM, this.teamForm.value)
			.subscribe(() => {
				this.sent = true;
				this.submitting = false;

				this.slackService
					.send({
						blocks: [
							this.slackService.buildTextBlock(`:tada: Team submission received`),
							{
								type: 'section',
								fields: this.slackService.buildFields(this.teamForm.value) as any
							},
							this.slackService.context
						]
					})
					.subscribe();
			}, err => {
				this.sent = false;
				this.submitting = false;
				this.logService.traceError('TeamSubmission', err);
			});

	}
}
