export const parseSerializedJSON = <T extends object>(queryString: string): T => {
	if (!queryString || queryString.length === 0) {
		return {} as T;
	}

	try {
		return JSON.parse(queryString);
	} catch (err) {
		throw new SyntaxError(`${err} (${queryString})`);
	}
};
