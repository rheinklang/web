// @ts-check

/**
 * Checks environment variables for validation purposes
 * @param {string[]} keys
 */
const checkEnvironment = (keys) => {
	const map = keys
		.map((key) => ({
			key,
			value: process.env[key] || '',
		}))
		.map((pair) => ({
			...pair,
			valid: pair.value && pair.value.length > 0,
		}));

	console.log('');
	map.forEach((entry) => {
		console.log(`[env] ${entry.key} = ${new Array(entry.value.length).fill('*').join('')}`);
	});
	console.log('');

	const allValid = map.every((entry) => entry.valid === true);
	const invalidKeys = map.filter((entry) => entry.valid !== true).map((entry) => entry.key);

	if (!allValid) {
		console.log('Not all required environment variables are set, exiting process.');
		console.log(` -> Invalid keys: ${invalidKeys.join(', ')}`);
		process.exit(0);
	}

	return true;
};

module.exports.checkEnvironment = checkEnvironment;
