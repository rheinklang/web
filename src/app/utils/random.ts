export const getRandomNumberInRange = (range: number = 99999) => Math.floor(Math.random() * range);

export const getRandomItemsFrom = <T>(list: T[], amount: number, unique = true) => {
	const uniqueFilterIds: number[] = [];

	return new Array(amount)
		.fill((v, i) => i)
		.map(() => {
			if (!unique) {
				return getRandomNumberInRange(list.length);
			}

			const nextUniqueId = getRandomNumberInRange(list.length);
			if (uniqueFilterIds.indexOf(nextUniqueId) === -1) {
				uniqueFilterIds.push(nextUniqueId);
				return nextUniqueId;
			}

			return null;
		})
		.map((randomIndex) => list[randomIndex] || null);
};
