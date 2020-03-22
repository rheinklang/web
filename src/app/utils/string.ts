export const capitalize = (s: any): string => {
	if (typeof s !== 'string') {
		return '';
	}

	return s.charAt(0).toUpperCase() + s.slice(1);
};

export const readableKey = (keyString: string) =>
	keyString.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

export const excerptWords = (val: string, maxLength = 1000) => {
	if (val.length <= maxLength) {
		return val;
	}

	let trimmedString = val.substr(0, maxLength);
	if (val.length > trimmedString.length) {
		// re-trim if we are in the middle of a word and
		trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
	}

	return `${trimmedString} ...`;
};
