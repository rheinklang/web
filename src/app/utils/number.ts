export const tryParse = (value: string, type: 'float' | 'int' = 'int') => {
	try {
		return type === 'int' ? parseInt(value, 10) : parseFloat(value);
	} catch (err) {
		return 0;
	}
};
