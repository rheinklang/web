const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
	await pwaAssetGenerator.generateImages('./src/assets/img/app/pwa-logo.jpg', './src/assets/img/app/', {
		scrape: false,
		background: 'rgba(255,255,255,1)',
		portraitOnly: true,
		log: false,
		pathOverride: 'assets/img/app',
		path: 'assets/img/app',
		manifest: './src/manifest.webmanifest',
		index: './src/index.html',
		maskable: false,
		quality: 80,
	});
})();
