import { CockpitRequiredField, CockpitOptionalField } from './CockpitField';
import { ImageSchema } from './ImageSchema';

export enum SponsorLevel {
	BRONZE = 'bronze',
	SILVER = 'silver',
	GOLD = 'gold',
	PLATINUM = 'platinum',
}

export type SponsorLevelType = SponsorLevel | null;

export interface SponsorSchema<TLogo extends Partial<ImageSchema> = ImageSchema> {
	slug: CockpitRequiredField<string>;
	name: CockpitRequiredField<string>;
	url: CockpitRequiredField<string>;
	logo: CockpitRequiredField<TLogo>;
	description: CockpitOptionalField<string>;
	sortWeight: CockpitOptionalField<string>;
	level: CockpitOptionalField<SponsorLevelType>;
	lastActiveYear: CockpitOptionalField<string>;
	joinedYear: CockpitOptionalField<string>;
}
