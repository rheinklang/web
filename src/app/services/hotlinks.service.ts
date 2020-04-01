import { Injectable } from '@angular/core';
import { HotlinksGQL } from '../queries/Hotlinks.query';
import { map, flatMap } from 'rxjs/operators';
import { LogService } from './log.service';
import { parseSerializedJSON } from '../utils/json';

@Injectable({
	providedIn: 'root',
})
export class HotlinksService {
	constructor(private hotlinksGQL: HotlinksGQL, private logService: LogService) {}

	public getHotlinks() {
		return this.hotlinksGQL.watch().valueChanges.pipe(
			map((res) => res.data.hotlinksCollection),
			map((entries) =>
				entries.map((entry) => ({
					...entry,
					queryParams: this.deserializeQuery(entry.queryParams),
				}))
			)
		);
	}

	public deserializeQuery(input: string) {
		try {
			return parseSerializedJSON(input);
		} catch (err) {
			this.logService.traceError('HotlinksService', err);
			return {};
		}
	}
}
