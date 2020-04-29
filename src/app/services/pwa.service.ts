import { Injectable } from '@angular/core';
import { PWAConfigSingletonGQL, PWAConfigSingletonGQLResponse } from 'app/queries/PWAConfig.singleton';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
	providedIn: 'root',
})
export class PWAService {
	constructor(private config: PWAConfigSingletonGQL, private swUpdate: SwUpdate) {}

	public getConfig() {
		return this.config.fetch();
	}

	public updatesAvailable() {
		return this.swUpdate.available;
	}

	public async update() {
		await this.swUpdate.activateUpdate();
		document.location.reload();
	}
}
