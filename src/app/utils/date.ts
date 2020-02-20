export const createExpirationDate = (date: Date, days: number) => {
	return new Date(date.valueOf() + 864e5 * days);
};
