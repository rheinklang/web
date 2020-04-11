import { Injectable } from '@angular/core';
import { trackGTMEvent } from '../utils/gtag';
import { CockpitService } from './cockpit.service';

@Injectable({
	providedIn: 'root',
})
export class FormsService {
	constructor(private cockpit: CockpitService) {}

	public submit<T extends object>(name: string, data: T = {} as T) {
		const payload: T = {
			...data,
			location: window.location.href,
			timestamp: new Date().toUTCString(),
		};

		trackGTMEvent(`submit_${name}`, {
			category: 'contact',
			label: `Submission for ${name}`,
			value: JSON.stringify(data),
		});

		// send log in parallel to cockpit
		return this.cockpit.post<T, {}>(`/forms/submit/${name}`, payload);
	}
}
