import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LogoQueryResponse, getLogoQuery } from '../queries/logo-singleton';

@Injectable({
	providedIn: 'root'
})
export class LogoService {
	constructor(private apollo: Apollo) { }

	public getLogo<T extends string = any>(id: string) {
		return this.apollo.watchQuery<LogoQueryResponse<T>>({
			query: getLogoQuery(id)
		}).valueChanges;
	}
}
