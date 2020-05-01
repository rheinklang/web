import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
	public static shouldPreload(): boolean {
		// Get NetworkInformation object
		const conn: { saveData: boolean; effectiveType?: string } = (navigator as any).connection || {};
		if (conn) {
			// Save-Data mode
			if (conn.saveData) {
				return false;
			}
			// 'slow-2g', '2g', '3g', or '4g'
			const effectiveType = conn.effectiveType || '';
			// 2G network
			if (effectiveType.includes('2g')) {
				return false;
			}
		}

		return true;
	}

	preload(route: Route, load: () => Observable<any>): Observable<any> {
		if (!CustomPreloadingStrategy.shouldPreload()) {
			// slow network or data save mode detected, skip preloading
			return of(null);
		}

		if (route.data && route.data.preload) {
			const delay: number = route.data.delay || 0;
			return timer(delay).pipe(
				flatMap((_) => {
					return load();
				})
			);
		} else {
			return of(null);
		}
	}
}
