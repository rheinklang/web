import { Component, Input } from '@angular/core';
import { theme } from './static-map.theme';
import { environment } from '../../../../environments/environment';

const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/staticmap`;

export type MapCoordinates = [number, number];

@Component({
	selector: 'rk-static-map',
	templateUrl: './static-map.component.html',
	styleUrls: ['./static-map.component.scss']
})
export class StaticMapComponent {

	public static STYLE_PARAMS = theme;

	@Input() public coordinates: MapCoordinates;
	@Input() public zoom = 16;
	@Input() public height = 300;
	@Input() public width = 1920;
	@Input() public format = 'png';
	@Input() public type = 'roadmap';
	@Input() public alt = '';

	public get ready() {
		return this.coordinates && Array.isArray(this.coordinates) && this.coordinates.length > 0;
	}

	public generatedMapsURL(retina = false) {
		const m = retina === true ? 2 : 1;

		return [
			GOOGLE_MAPS_URL,
			// `?size=${retina ? this.width * 2 : this.width}x${retina ? this.height * 2 : this.height}`,
			`?size=${this.width * m}x${this.height * m}`,
			retina ? `&scale=2` : '',
			`&key=${environment.gcpKey}`,
			`&secret=${environment.gcpStaticMapsSecret}`,
			`&center=${this.coordinates.join(',')}`,
			`&zoom=${this.zoom}`,
			`&format=${this.type}`,
			`&maptype=${this.type}`,
			`&markers=color:white&7CRheinklang+Festival`,
			StaticMapComponent.STYLE_PARAMS
		].join('');
	}

	public get fallbackSource() {
		return this.generatedMapsURL(true);
	}

	public get sourceSet() {
		return `${this.generatedMapsURL(false)} x1, ${this.generatedMapsURL(true)} x2`;
	}

}
