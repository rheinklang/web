import { Injectable } from '@angular/core';
import { PWAConfigSingletonGQL, PWAConfigSingletonGQLResponse } from 'app/queries/PWAConfig.singleton';
import { SwUpdate } from '@angular/service-worker';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class PWAService {
	constructor(private config: PWAConfigSingletonGQL, private swUpdate: SwUpdate, private storage: Storage) {}

	public getConfig() {
		return this.config.fetch().pipe(map((res) => res.data.pwaConfigSingleton));
	}

	public updatesAvailable() {
		return this.swUpdate.available;
	}

	public async update() {
		await this.swUpdate.activateUpdate();
		document.location.reload();
	}

	public initializePWACore() {
		this.getConfig().subscribe((config) => {
			return this.storage.get('pwa').then((currentConfig) => {
				let updated = false;

				if (currentConfig && currentConfig.cacheVersion !== config.cacheVersion) {
					if (typeof caches !== 'undefined') {
						Object.keys(caches).forEach((key) => caches.delete(key));
						updated = true;
					}
				}

				this.storage.set('pwa', {
					config,
					updated,
					timestamp: Date.now(),
				});
			});
		});
	}
}
