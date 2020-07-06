import { environment } from '../environments/environment';

declare var fbq;

export let initialized = false;

export const injectFacebookPixelScript = () => {
	const global: any = window;
	const doc = document;
	const tag = 'script';
	const src = `https://connect.facebook.net/en_US/fbevents.js`;

	// tslint:disable-next-line: one-variable-per-declaration
	let initializer: any, scriptNode: any, nodeLoc: any;

	if (global.fbq) {
		return;
	}

	initializer = global.fbq = function fbqmInit() {
		initializer.callMethod
			? initializer.callMethod.apply(initializer, arguments)
			: initializer.queue.push(arguments);
	};

	if (!global._fbq) {
		global._fbq = initializer;
	}

	initializer.push = initializer;
	initializer.loaded = !0;
	initializer.version = '2.0';

	initializer.queue = [];

	scriptNode = doc.createElement(tag);
	scriptNode.async = !0;
	scriptNode.src = src;

	nodeLoc = doc.getElementsByTagName(tag)[0];
	nodeLoc.parentNode.insertBefore(scriptNode, nodeLoc);

	if (!initialized) {
		fbq('init', `${environment.fbqId}`);
	}

	initialized = true;
};
