// @ts-check
const globby = require('globby');
const rimraf = require('rimraf');

(async () => {
	const files = await globby([
		'./node_modules/moment/locale/*',
		'!./node_modules/moment/locale/de.js',
		'!./node_modules/moment/locale/de-at.js',
		'!./node_modules/moment/locale/de-ch.js',
	]);

	files.forEach((file) => rimraf.sync(file));
})();
