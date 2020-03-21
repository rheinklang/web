// @ts-check
const fs = require('fs-extra');
const { resolve, basename } = require('path');
// @ts-ignore
const { green, red, grey } = require('chalk');

const copies = [
	{
		from: 'src/server/.htaccess',
		to: 'dist/.htaccess',
	},
	{
		from: 'src/server/sitemap.xml',
		to: 'dist/sitemap.xml',
	},
	{
		from: 'src/server/robots.txt',
		to: 'dist/robots.txt',
	},
];

const fromRoot = (subpath) => resolve(__dirname, '..', subpath);

const copyProcess = copies.map(({ from, to }) => ({
	filename: basename(to),
	promise: fs.copyFile(fromRoot(from), fromRoot(to)),
}));

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
