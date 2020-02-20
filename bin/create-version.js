const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { green } = require('chalk');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync(resolve(__dirname, '..'), {
	dirtyMark: false,
	dirtySemver: false
});

gitInfo.version = version;

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
writeFileSync(
	file,
	`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = '${gitInfo.version}';
export const SUFFIX = '${gitInfo.suffix}';
export const TAG = '${gitInfo.tag}';
export const HASH = '${gitInfo.hash}';

export default ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`,
	{ encoding: 'utf-8' }
);

console.log(green(`🧬  Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`));
