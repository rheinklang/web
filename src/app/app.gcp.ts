import { environment } from '../environments/environment';
import { CallbackFactory } from './utils/callback-factory';

// ensure callbacks for ...
CallbackFactory.safe(['map']);

export const injectGCPMapsScript = () => {
	if (window.screen.width <= 400) {
		// abort loading gcp embedd on mobile
		return;
	}

	const tag = document.createElement('script');
	// tslint:disable-next-line: max-line-length
	tag.src = `https://maps.googleapis.com/maps/api/js?key=${environment.gcpKey}&secret=${
		environment.gcpStaticMapsSecret
	}&callback=${CallbackFactory.getIdFor('map')}`;
	try {
		document.head.appendChild(tag);
	} catch (err) {
		// do nothing ...
	}
};
