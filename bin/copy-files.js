// @ts-check
const fs = require('fs-extra');
const { resolve, basename } = require('path');
// @ts-ignore
const { green, red, grey } = require('chalk');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const copies = [
	{
		enabled: true,
		from: 'src/server/.htaccess',
		to: 'dist/.htaccess',
	},
	{
		enabled: true,
		from: 'src/server/sitemap.xml',
		to: 'dist/sitemap.xml',
	},
	{
		enabled: process.env.NODE_ENV === 'production',
		from: 'src/server/robots.txt',
		to: 'dist/robots.txt',
	},
	{
		enabled: process.env.NODE_ENV !== 'production',
		from: 'src/server/robots-noindex.txt',
		to: 'dist/robots.txt',
	},
	{
		enabled: true,
		from: 'src/server/3rdpartylicenses.txt',
		to: 'dist/3rdpartylicenses.txt',
	},
];

const fromRoot = (subpath) => resolve(__dirname, '..', subpath);

const copyProcess = copies
	.map(({ from, to, enabled }) =>
		enabled
			? {
				filename: basename(to),
				promise: fs.copyFile(fromRoot(from), fromRoot(to)),
			}
			: null
	)
	.filter(Boolean);

Promise.all(copyProcess.map((c) => c.promise))
	.then(() => {
		console.log('');
		console.log(green('📡 Files were copied to the output directory'));
		copyProcess.forEach((c) => {
			console.log(grey(` - ${c.filename}`));
		});
		console.log('');
	})
	.catch((err) => {
		console.log('');
		console.log(red(`📡 Files couldn't be copied: ${err}`));
		console.log('');
	});
