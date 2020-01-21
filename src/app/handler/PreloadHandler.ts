import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators'

import { PreloadingStrategy, Route } from '@angular/router';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

	preload(route: Route, load: () => Observable<any>): Observable<any> {

		if (route.data && route.data.preload) {
			const delay: number = route.data.delay || 0;
			console.log('preload called on ' + route.path + ' delay is ' + delay);
			return timer(delay).pipe(
				flatMap(_ => {
					console.log('Loading now ' + route.path);
					return load();
				}));
		} else {
			console.log('no preload for the path ' + route.path);
			return of(null);
		}
	}

}
