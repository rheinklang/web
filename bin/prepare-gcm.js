// @ts-check
const path = require('path');
const fs = require('fs-extra');
const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.resolve(ROOT, 'src/manifest.webmanifest');

(async () => {
	const wm = await fs.readFile(MANIFEST_PATH);
	const nwm = wm.toString().replace('%GCM_SENDER_ID%', process.env.GCM_SENDER_ID);
	await fs.writeFile(MANIFEST_PATH, nwm);
})();
