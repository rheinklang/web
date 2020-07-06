const { resolve } = require('path');
const { writeFile, mkdirp } = require('fs-extra');
const { argv } = require('yargs');
const { green, red } = require('chalk');
const axios = require('axios');

require('dotenv').config();

const API_KEY = process.env.COCKPIT_API_KEY;
const API_URL = process.env.COCKPIT_API_URL;
const LOC_HOST =
	process.env.NODE_ENV === 'production'
		? 'https://rheinklang-festival.ch'
		: 'https://beta.rheinklang-festival.ch';

const HEADERS = {
	Authorization: `Bearer ${API_KEY}`,
	'Content-Type': 'application/json',
};

(async () => {
	const res = await axios.get(`${API_URL}/collections/get/sitemap?token=${API_KEY}`, {
		headers: HEADERS,
		responseType: 'json',
	});

	const sitemapURLSet = res.data.entries.map((entry) => {
		return [
			`<url>`,
			`<loc>${LOC_HOST}${entry.url}</loc>`,
			`<priority>${entry.priority}</priority>`,
			entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : '',
			entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '',
			`</url>`,
		].join('\n');
	});

	const sitemapContent = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		sitemapURLSet.join('\n'),
		`</urlset>`,
	].join('\n');

	await writeFile(resolve(__dirname, '../src/server/sitemap.xml'), sitemapContent);

	console.log('');
	console.log(`Written ${green(res.data.entries.length)} URL sets to the sitemap file`);
	console.log('');
})();
