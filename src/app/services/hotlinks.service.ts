import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseSerializedJSON } from '../utils/json';
import { HotlinksGQL } from '../queries/Hotlinks.query';
import { ParsedHotlinkSchema } from '../schema/HotlinkSchema';
import { LogService } from './log.service';

@Injectable({
	providedIn: 'root',
})
export class HotlinksService {
	constructor(private hotlinksGQL: HotlinksGQL, private logService: LogService) {}

	public getHotlinks(): Observable<ParsedHotlinkSchema[]> {
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
