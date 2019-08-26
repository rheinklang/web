export const environment = {
	production: true,
	assetCDNHost: process.env.ASSET_CDN_HOST || 'not-set.com',
	cockpitAPIURL: process.env.COCKPIT_API_URL || 'not-set.com',
	cockpitAPIKey: process.env.COCKPUT_API_KEY || 'key-not-set',
	graphQLHostURL: process.env.GRAPHQL_HOST_URL || 'not-set.com'
};
