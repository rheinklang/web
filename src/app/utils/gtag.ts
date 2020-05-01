declare var gtag;

type GTMActionType =
	| 'add_payment_info'
	| 'add_to_cart'
	| 'add_to_wishlist'
	| 'begin_checkout'
	| 'checkout_progress'
	| 'generate_lead'
	| 'login'
	| 'purchase'
	| 'refund'
	| 'remove_from_cart'
	| 'search'
	| 'select_content'
	| 'set_checkout_option'
	| 'share'
	| 'sign_up'
	| 'view_item'
	| 'view_item_list'
	| 'view_promotion'
	| 'view_search_results'
	| string;

export type GTMCategory =
	| 'sponsors'
	| 'generic'
	| 'navigation'
	| 'social'
	| 'contact'
	| 'service'
	| 'link'
	| 'privacy';

export const saveGTMEventAction = (name: string) => name.replace(/\d/gi, '_').replace('-', '_');

export const trackGTMEvent = (
	action: GTMActionType,
	metaInfo: {
		category: GTMCategory | string;
		label: string;
		value: string;
		name?: string;
	}
) => {
	if (!gtag) {
		return;
	}

	gtag('event', saveGTMEventAction(action), {
		event_category: metaInfo.category,
		event_label: metaInfo.label,
		value: metaInfo.value,
		// add optional properties below
		...(name ? { name } : {}),
	});
};

export const trackGTMTimingEvent = () => {
	// Feature detects Navigation Timing API support.
	if (window.performance) {
		// Gets the number of milliseconds since page load
		// (and rounds the result since the value must be an integer).
		const timeSincePageLoad = Math.round(performance.now());

		// Sends the timing event to Google Analytics.
		gtag('event', 'timing_complete', {
			name: 'load',
			value: timeSincePageLoad,
			category: 'JS Dependencies',
		});
	}
};
