// @ts-check
require('dotenv').config();

const { resolve, join } = require('path');
const FTPDeployClient = require('ftp-deploy');
const argv = require('yargs').argv
const ora = require('ora');
// @ts-ignore
const deployer = new FTPDeployClient();

/**
 * @type {string}
 */
// @ts-ignore
const TAG = argv.tag ? argv.tag : 'beta';
const REMOTE_DIR = join(process.env.FTP_REMOTE_ROOT, TAG);
const SOURCE_DIR = resolve(__dirname, 'dist/rheinklang');


const loader = ora(`Uploading to ${REMOTE_DIR}`).start();

const config = {
	user: process.env.FTP_USER,
	// Password optional, prompted if none given
	password: process.env.FTP_PASSWORD,
	host: process.env.FTP_HOST,
	port: 21,
	localRoot: SOURCE_DIR,
	remoteRoot: REMOTE_DIR,
	// include: ['*', '**/*'],      // this would upload everything except dot files
	include: ['**/*'],
	// e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
	exclude: [],
	// delete ALL existing files at destination before uploading, if true
	deleteRemote: false,
	// Passive mode is forced (EPSV command is not sent)
	forcePasv: true
};

// @ts-ignore
deployer.on('uploading', function (data) {
	loader.text = `Uploading ${data.filename} (${data.transferredFileCount} of ${data.totalFilesCount}) ...`;
});

// use with callback
deployer.deploy(config, err => {
	if (err) {
		loader.fail(`${err}`);
	} else {
		loader.succeed('Deployed application successfully');
	}

	console.log('');
});
