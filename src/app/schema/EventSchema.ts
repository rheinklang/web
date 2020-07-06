import { PreviewImagePathOnly } from '../types/PreviewImage';
import { CockpitPopulatedField, CockpitOptionalField, CockpitRequiredField } from './CockpitField';
import { LocationSchema } from './LocationSchema';
import { TicketsSchema } from './TicketsSchema';
import { ImpressionSchema } from './ImpressionSchema';

export enum EventType {
	COOPERATION = 'Cooperation',
	EXCLUSIVE = 'Exclusive',
	DAYDANCE = 'DayDance',
	FESTIVAL = 'Festival',
	NONE = 'None',
}

export interface EventSchema<
	TLocation extends CockpitPopulatedField<Partial<LocationSchema>> = CockpitPopulatedField<
		Partial<LocationSchema>
	>,
	TTickets extends CockpitPopulatedField<Partial<TicketsSchema>> = CockpitPopulatedField<Partial<TicketsSchema>>
> {
	slug: CockpitRequiredField<string>;
	title: CockpitRequiredField<string>;
	date: CockpitRequiredField<string>;
	description: CockpitOptionalField<string>;
	facebookUrl: CockpitOptionalField<string>;
	link: CockpitOptionalField<string>;
	hiddenDate: CockpitOptionalField<boolean>;
	hide: CockpitOptionalField<boolean>;
	canceled: CockpitRequiredField<boolean>;
	linkType: CockpitOptionalField<'internal' | 'external'>;
	secret: CockpitOptionalField<boolean>;
	type: CockpitOptionalField<EventType>;
	impression: CockpitOptionalField<ImpressionSchema>;
	previewImage: CockpitOptionalField<PreviewImagePathOnly>;
	tickets: CockpitOptionalField<TTickets>;
	location: CockpitOptionalField<TLocation>;
}
