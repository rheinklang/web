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
			'Content-Type': 'application/json'
		};
	}

	/**
	 * Fetches data from a certain endpoint in cockpit
	 * @param url target URL
	 */
	public get<T extends object = object>(url: string) {
		return this.http.get<T>(`${environment.cockpitAPIURL}${url}?token=${environment.cockpitAPIKey}`, {
			headers: this.headers,
			responseType: 'json'
		});
	}

	/**
	 * Posts data to a certain endpoint in cockpit
	 * @param url target URL
	 * @param data dataset
	 */
	public post<D extends object, R extends object = object>(url: string, data: D) {
		return this.http.post<R>(
			`${environment.cockpitAPIURL}${url}?token=${environment.cockpitAPIKey}`,
			{
				form: data
			},
			{
				headers: this.headers,
				responseType: 'json'
			}
		);
	}
}
