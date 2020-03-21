import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DeviceService {
	public getIsMobile() {
		if (window.screen.width <= 400) {
			return true;
		}

		return false;
	}
}
