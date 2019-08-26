// @ts-check
require('dotenv').config();

const { resolve, join } = require('path');
// @ts-ignore
const { cyan, green, red, grey } = require('chalk');
const FTPDeployClient = require('ftp-deploy');
const argv = require('yargs').argv
const ora = require('ora');
// @ts-ignore
const pkg = require('./package.json');
// @ts-ignore
const deployer = new FTPDeployClient();

/**
 * @type {string}
 */
// @ts-ignore
const TAG = argv.tag ? argv.tag : 'beta';
const NEXT = argv.next || false;
const REMOTE_DIR = join(process.env.FTP_REMOTE_ROOT, NEXT ? `${TAG}-${pkg.version}` : TAG);
const SOURCE_DIR = resolve(__dirname, 'dist/rheinklang');

const loader = ora(`Uploading to ${cyan(REMOTE_DIR)}`).start();

const config = {
	user: process.env.FTP_USER,
	// Password optional, prompted if none given
	password: process.env.FTP_PASSWORD,
	host: process.env.FTP_HOST,
	port: 21,
	localRoot: SOURCE_DIR,
	remoteRoot: REMOTE_DIR,
	include: ['**/*', '*', '.htaccess'],
	// e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
	exclude: [],
	// delete ALL existing files at destination before uploading, if true
	deleteRemote: true,
	// Passive mode is forced (EPSV command is not sent)
	forcePasv: true
};

// @ts-ignore
deployer.on('uploading', function (data) {
	const percentage = (data.transferredFileCount / data.totalFilesCount * 100).toFixed(0)
	loader.text = `Uploading ${cyan(data.filename)} ` + grey(`(${percentage}% / ${(data.transferredFileCount)} of ${data.totalFilesCount})`);
});

// use with callback
deployer.deploy(config, (err, res) => {
	if (err) {
		loader.fail(red(`${err}`));
	} else {
		loader.succeed(green('📦 Deployed application successfully'));
		res.reduce((p, c) => p.concat(c), []).forEach(entry => {
			const readable = `${entry}`.replace(SOURCE_DIR, '').replace('uploaded', '')
			console.log(grey(`-> ${readable}`));
		});
	}

	console.log('');
});
