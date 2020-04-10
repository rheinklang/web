const { resolve } = require('path');
const { writeFile, mkdirp } = require('fs-extra');
const { argv } = require('yargs');
const { green, red } = require('chalk');
const { checkEnvironment } = require('./utils');
const pkg = require('../package.json');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

checkEnvironment([
	'ASSET_CDN_HOST',
	'COCKPIT_API_URL',
	'COCKPIT_API_KEY',
	'GRAPHQL_HOST_URL',
	'GTM_ID',
	'GCP_KEY',
	'GCP_STATIC_MAPS_SECRET',
	'SLACK_ERROR_HOOK_URL',
	'DEBUG_NG_ROUTER',
]);

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod' || environment === 'production';

const targetPath = resolve(__dirname, `../src/environments/environment${environment ? `.${environment}` : ''}.ts`);
const envConfigFile =
	(isProd
		? `/* ${new Date().toISOString()} */`
		: `/**
 * DO NOT MODIFY THIS FILE DIRECTLY
 * Autogenerated file by the bin/create-env.js script
 * @generated ${new Date().toISOString()}
 */`) +
	`
export const environment = {
	production: ${isProd},
	buildNumber: 'v${pkg.version}#${Date.now()}',
	assetCDNHost: '${process.env.ASSET_CDN_HOST}',
	cockpitAPIURL: '${process.env.COCKPIT_API_URL}',
	cockpitAPIKey: '${process.env.COCKPIT_API_KEY}',
	graphQLHostURL: '${process.env.GRAPHQL_HOST_URL}',
	gtmId: '${process.env.GTM_ID}',
	gcpKey: '${process.env.GCP_KEY}',
	gcpStaticMapsSecret: '${process.env.GCP_STATIC_MAPS_SECRET}',
	slackErrorHookURL: '${process.env.SLACK_ERROR_HOOK_URL}',
	debugNgRouter: ${process.env.DEBUG_NG_ROUTER || false}
};
${!isProd ? `import 'zone.js/dist/zone-error';` : ''}
`;

(async () => {
	try {
		await mkdirp(resolve(__dirname, '..', 'src', 'environments'));
		await writeFile(targetPath, envConfigFile);
		console.log(green(`🛠  Environment generated at ${targetPath}`));
		process.exit(0);
	} catch (err) {
		console.log(red(`🛠  Environment couldn't be generated: ${err}`));
		process.exit(2);
	}
})();
