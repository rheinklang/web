/**
 * Function to sort alphabetically an array of objects by some specific key.
 */
export function dynamicSort<TFactory extends Record<string, any>>(property: string & keyof TFactory) {
	let sortOrder = 1;

	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}

	return (a: TFactory, b: TFactory) => {
		if (sortOrder === -1) {
			return b[property].localeCompare(a[property]);
		} else {
			return a[property].localeCompare(b[property]);
		}
	};
}

export const sortByYear = (ai: string | 0, bi: string | 0) => {
	const a = typeof ai === 'number' ? ai : parseInt(ai, 10);
	const b = typeof bi === 'number' ? bi : parseInt(bi, 10);

	return a === b ? 0 : a > b ? 1 : -1;
};

export const sortByDate = <T extends object>(arr: T[], dateFieldExtractor: (entry: T) => string | undefined) => {
	return arr
		.map((article) => {
			const dateField = dateFieldExtractor(article);
			return {
				...article,
				__isoDate__: dateField ? Date.parse(dateField) : 0,
			};
		})
		.sort((a, b) => {
			if (a.__isoDate__ === b.__isoDate__) {
				return 0;
			}

			return a.__isoDate__ > b.__isoDate__ ? -1 : 1;
		});
};
