// @ts-check

const path = require('path');
const fs = require('fs-extra');
const ROOT = path.resolve(__dirname, '..');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const MANIFEST_TPL_PATH = path.resolve(ROOT, 'src/manifest.webmanifest.template');
const SW_TPL_PATH = path.resolve(ROOT, 'src/firebase-messaging-sw.js.template');
const MANIFEST_PATH = path.resolve(ROOT, 'src/manifest.webmanifest');
const SW_PATH = path.resolve(ROOT, 'src/firebase-messaging-sw.js');

const replacers = [
	'FIREBASE_API_KEY',
	'FIREBASE_AUTH_DOMAIN',
	'FIREBASE_DATABASE_URL',
	'FIREBASE_PROJECT_ID',
	'FIREBASE_STORAGE_BUCKET',
	'FIREBASE_MESSAGING_SENDER_ID',
	'FIREBASE_APP_ID',
	'FIREBASE_MEASUREMENT_ID',
];

const replacePlaceholders = (contents) => {
	replacers.forEach((replacer) => {
		contents = contents.replace(`%${replacer}%`, process.env[replacer]);
	});

	return contents;
};

(async () => {
	const wm = await fs.readFile(MANIFEST_TPL_PATH);
	const nwm = replacePlaceholders(wm.toString());
	await fs.writeFile(MANIFEST_PATH, nwm);

	const sw = await fs.readFile(SW_TPL_PATH);
	const nsw = replacePlaceholders(sw.toString());
	await fs.writeFile(SW_PATH, nsw);
})();
