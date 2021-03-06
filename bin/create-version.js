const { gitDescribeSync } = require('git-describe');
const { resolve, relative } = require('path');
const { green, red } = require('chalk');
const { writeFile, mkdirp } = require('fs-extra');
const { version } = require('../package.json');

const gitInfo = gitDescribeSync(resolve(__dirname, '..'), {
	dirtyMark: false,
	dirtySemver: false,
});

gitInfo.version = version;

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');

(async () => {
	try {
		await mkdirp(resolve(__dirname, '..', 'src', 'environments'));
		await writeFile(
			file,
			`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
		/* tslint:disable */
		export const VERSION = '${gitInfo.version}';
		export const SUFFIX = '${gitInfo.suffix}';
		export const TAG = '${gitInfo.tag}';
		export const HASH = '${gitInfo.hash}';

		export default ${JSON.stringify(gitInfo, null, 4)};
		/* tslint:enable */` + '\n',
			{ encoding: 'utf-8' }
		);
		console.log(green(`🧬  Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`));
		process.exit(0);
	} catch (err) {
		console.log(red(`🧬  Failed writing version info: ${err}`));
		process.exit(2);
	}
})();
