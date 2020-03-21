import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LiveStreamGQL } from '../queries/LiveStream.singleton';

@Injectable({
	providedIn: 'root',
})
export class LiveStreamService {
	constructor(private liveStreamGQL: LiveStreamGQL) {}

	public getLiveStream() {
		return this.liveStreamGQL.watch().valueChanges.pipe(map((res) => res.data.livestreamSingleton));
	}
}
