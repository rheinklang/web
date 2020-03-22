import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SliderConfigSingletonGQL } from '../queries/SliderConfig.singleton';
import { CACHE_AND_UPDATE_POLICY } from '../config/policies';
import { Observable } from 'rxjs';

export const DEFAULT_AUTOPLAY_MOBILE_INTERVAL = 60 * 1000 * 10; // 10min
export const DEFAULT_AUTOPLAY_DESKTOP_INTERVAL = 10000000; // 6 * 1000; // 6s^

export interface SliderConfig {
	loopEnabled: boolean;
	sliderAutoplaySpeedDesktop: number;
	sliderAutoplaySpeedMobile: number;
}

@Injectable({
	providedIn: 'root',
})
export class SliderConfigService {
	constructor(private sliderConfig: SliderConfigSingletonGQL) {}

	public getConfig(): Observable<SliderConfig> {
		return this.sliderConfig.watch().valueChanges.pipe(
			map(
				(res) =>
					res.data.sliderConfigSingleton || {
						loopEnabled: true,
						sliderAutoplaySpeedMobile: `${DEFAULT_AUTOPLAY_MOBILE_INTERVAL}`,
						sliderAutoplaySpeedDesktop: `${DEFAULT_AUTOPLAY_DESKTOP_INTERVAL}`,
					}
			),
			map((config) => {
				const { loopEnabled, sliderAutoplaySpeedDesktop, sliderAutoplaySpeedMobile } = config;

				return {
					loopEnabled,
					sliderAutoplaySpeedDesktop: sliderAutoplaySpeedDesktop
						? parseInt(sliderAutoplaySpeedDesktop, 10)
						: DEFAULT_AUTOPLAY_DESKTOP_INTERVAL,
					sliderAutoplaySpeedMobile: sliderAutoplaySpeedMobile
						? parseInt(sliderAutoplaySpeedMobile, 10)
						: DEFAULT_AUTOPLAY_MOBILE_INTERVAL,
				};
			})
		);
	}
}
