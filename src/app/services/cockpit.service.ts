import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CockpitService {
	constructor(private http: HttpClient) {}

	private get headers() {
		return {
			Authorization: `Bearer ${environment.cockpitAPIKey}`,
			'X-Client': 'CockpitService'
		};
	}

	/**
	 * Fetches data from a certain endpoint in cockpit
	 * @param url target URL
	 */
	public get<T extends object = object>(url: string) {
		return this.http.get<T>(`${environment.cockpitAPIURL}${url}`, {
			headers: this.headers,
			responseType: 'json'
		});
	}
}
