// @ts-check
const path = require('path');
const fs = require('fs-extra');
const ROOT = path.resolve(__dirname, '..');

const MANIFEST_TPL_PATH = path.resolve(ROOT, 'src/manifest.webmanifest.template');
const SW_TPL_PATH = path.resolve(ROOT, 'src/manifest.webmanifest.template');
const MANIFEST_PATH = path.resolve(ROOT, 'src/manifest.webmanifest.template');
const SW_PATH = path.resolve(ROOT, 'src/manifest.webmanifest.template');

(async () => {
	const wm = await fs.readFile(MANIFEST_TPL_PATH);
	const nwm = wm.toString().replace('%GCM_SENDER_ID%', process.env.GCM_SENDER_ID);
	await fs.writeFile(MANIFEST_PATH, nwm);

	const sw = await fs.readFile(SW_TPL_PATH);
	const nsw = sw.toString().replace('%GCM_SENDER_ID%', process.env.GCM_SENDER_ID);
	await fs.writeFile(SW_PATH, nsw);
})();
