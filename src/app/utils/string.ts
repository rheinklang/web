export const capitalize = (s: any): string => {
	if (typeof s !== 'string') {
		return '';
	}

	return s.charAt(0).toUpperCase() + s.slice(1);
};

export const readableKey = (keyString: string) =>
	keyString.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
