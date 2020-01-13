import { environment } from '../environments/environment';

export const injectGTMScript = () => {
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gtmId}`;
	document.head.prepend(script);
};
