import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GetIPResponse {
	ip: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_code: string;
	// country_code_iso3: "CHE",
	// country_capital: "Bern",
	// country_tld: ".ch",
	// country_name: "Switzerland",
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	// timezone: "Europe/Zurich",
	// utc_offset: "+0100",
	// country_calling_code: "+41",
	// currency: "CHF",
	// currency_name: "Franc",
	// languages: "de-CH,fr-CH,it-CH,rm",
	// country_area: 41290.0,
	// country_population: 8484100.0,
	asn: string;
	org: string;
}

@Injectable({
	providedIn: 'root'
})
export class IPService {
	constructor(private http: HttpClient) {}

	public getIP() {
		return this.http.get<GetIPResponse>(`https://ipapi.co/json/`);
	}
}
