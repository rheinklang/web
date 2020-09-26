import { Injectable } from '@angular/core';
import { map, filter, flatMap } from 'rxjs/operators';
import { PopupGQL } from '../queries/Popup.query';
import { PopupEntryByGUIDGQL } from '../queries/PopupEntryByGUID';

@Injectable({
	providedIn: 'root',
})
export class PopupService {
	constructor(private popupGQL: PopupGQL, private popupByGUIDGQL: PopupEntryByGUIDGQL) {}

	public getGuests() {
		return this.popupGQL.watch().valueChanges.pipe(map((res) => res.data.popupHeerbruggGuestsCollection));
	}

	public getGuestByGUID(guid: string) {
		return this.popupByGUIDGQL
			.watch({
				filter: {
					guid,
				},
			})
			.valueChanges.pipe(map((res) => res.data.popupHeerbruggGuestsCollection[0]));
	}
}
