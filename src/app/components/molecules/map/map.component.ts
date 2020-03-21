/// <reference types="@types/googlemaps" />
import {
	Input,
	Output,
	EventEmitter,
	OnInit,
	AfterViewInit,
	ViewEncapsulation,
	Component,
	ViewChild,
	ElementRef,
} from '@angular/core';
import { theme as darkTheme } from './map.theme-dark';
import { theme as lightTheme } from './map.theme-light';
import { theme as mediumTheme } from './map.theme-medium';
import { CallbackFactory } from '../../../utils/callback-factory';
import { LogService } from '../../../services/log.service';

const extractLatLongExpr = /@(.*),(.*),/gi;

const themeMap = {
	light: lightTheme,
	dark: darkTheme,
	medium: mediumTheme,
} as const;

@Component({
	selector: 'rk-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, AfterViewInit {
	@Input() public url?: string;
	@Input() public coordinates?: [number, number];
	@Input() public zoom = 16;
	@Input() public title = '';
	@Input() public theme: 'light' | 'dark' = 'light';

	@Output() public loaded = new EventEmitter<MapComponent>();

	@ViewChild('rootInjector', { static: false })
	private node: ElementRef;

	public ready = false;

	constructor(private log: LogService) {}

	public get areCoordinatesValid() {
		return this.coordinates && this.coordinates.length === 2;
	}

	public ngOnInit() {
		if (this.url && !this.areCoordinatesValid) {
			const [, lat = 0, lng = 0] = extractLatLongExpr.exec(this.url) || [];

			if (lat && lng) {
				this.coordinates = [parseFloat(lat), parseFloat(lng)];
			}
		}
	}

	public ngAfterViewInit() {
		CallbackFactory.attachCallback('map', () => {
			this.ready = true;
			this.initMap();
			this.loaded.emit(this);
		});
	}

	private initMap() {
		if (!this.areCoordinatesValid || 'google' in window === false) {
			// invalid coordinate set
			this.log.trace({
				message: !this.areCoordinatesValid
					? `Invalid coordinates found in URL ${this.url}`
					: `Google Maps library could not be loaded`,
				code: 406,
				module: 'MapComponent',
			});
			return;
		}

		const map = new google.maps.Map(this.node.nativeElement, this.mapOptions);
		this.createMarker(map).setMap(map);
	}

	private createMarker(map: google.maps.Map) {
		return new google.maps.Marker({
			map,
			title: this.title,
			position: this.gcoords,
		});
	}

	private get gcoords() {
		const [lat, lng] = this.coordinates;
		return new google.maps.LatLng(lat, lng);
	}

	private get mapOptions() {
		return {
			center: this.gcoords,
			zoom: parseInt(`${this.zoom}`, 10),
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			styles: themeMap[this.theme],
		} as google.maps.MapOptions;
	}
}
