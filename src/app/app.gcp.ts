import { environment } from '../environments/environment';

export const injectGCPMapsScript = () => {
	const tag = document.createElement('script');
	// tslint:disable-next-line: max-line-length
	tag.src = `https://maps.googleapis.com/maps/api/js?key=${environment.gcpKey}&secret=${environment.gcpStaticMapsSecret}`;
	document.head.appendChild(tag);
};

