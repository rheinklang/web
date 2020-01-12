import { SponsorLevelType, SponsorLevel } from '../types/Sponsor';
import { SponsorsServiceEntry } from '../services/sponsors.service';
import { dynamicSort } from './sort';

export const sponsorLevelToOrderNumber = (level: SponsorLevelType) => {
	switch (level) {
		case SponsorLevel.BRONZE:
			return 1;
		case SponsorLevel.SILVER:
			return 2;
		case SponsorLevel.GOLD:
			return 3;
		case SponsorLevel.PLATINUM:
			return 4;
		default:
			return 0;
	}
};

export const sponsorLevelToGerman = (level: SponsorLevelType) => {
	switch (level) {
		case SponsorLevel.BRONZE:
			return 'Bronze';
		case SponsorLevel.SILVER:
			return 'Silber';
		case SponsorLevel.GOLD:
			return 'Gold';
		case SponsorLevel.PLATINUM:
			return 'Platin';
		default:
			return 'Unbekanntes';
	}
};

export const sponsorSortAlgorithm = (sponsors: SponsorsServiceEntry[]): SponsorsServiceEntry[] =>
	sponsors
		.map(sponsor => ({ ...sponsor, numericLevelValue: sponsorLevelToOrderNumber(sponsor.level) }))
		.sort(dynamicSort('name'))
		.sort((a, b) => a.sortWeight === b.sortWeight ? 0 : (a.sortWeight > b.sortWeight ? - 1 : 1))
		.sort((a, b) => a.numericLevelValue > b.numericLevelValue ? -1 : 1);
