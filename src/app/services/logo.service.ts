import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LogoQueryResponse, getDynamicLogoQuery } from '../queries/Logo.singleton';

@Injectable({
	providedIn: 'root'
})
export class LogoService {
	constructor(private apollo: Apollo) { }

	public getLogo<T extends string = any>(id: string) {
		return this.apollo.watchQuery<LogoQueryResponse<T>, void>({
			query: getDynamicLogoQuery(id)
		}).valueChanges;
	}
}
