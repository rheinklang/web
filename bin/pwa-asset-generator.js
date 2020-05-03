const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
	await pwaAssetGenerator.generateImages('./src/assets/img/pwa-logo.jpg', './src/assets/img/pwa/splash', {
		scrape: false,
		background: 'rgba(255,255,255,1)',
		portraitOnly: true,
		log: false,
		splashOnly: true,
		pathOverride: 'assets/img/pwa/splash',
		path: 'assets/img/pwa/splash',
		manifest: './src/manifest.webmanifest',
		index: './src/index.html',
		maskable: false,
		quality: 80,
	});
})();
