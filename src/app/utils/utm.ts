export const generateUrchingTrackingURL = (url: string, campaignId?: string) => {
	const campaign = campaignId ? `utm_campaign=${campaignId}` : '';
	return `${url}?utm_source=rheinklang&utm_medium=web${campaign}`;
}
