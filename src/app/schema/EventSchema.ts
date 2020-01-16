import { PreviewImagePathOnly } from '../types/PreviewImage';
import { CockpitPopulatedField, CockpitOptionalField, CockpitRequiredField } from './CockpitField';
import { LocationSchema } from './LocationSchema';
import { TicketsSchema } from './TicketsSchema';

export enum EventType {
	COOPERATION = 'Cooperation',
	EXCLUSIVE = 'Exclusive',
	DAYDANCE = 'DayDance',
	FESTIVAL = 'Festival',
	NONE = 'None'
}

export interface EventSchema<
	TLocation extends CockpitPopulatedField<Partial<LocationSchema>> = CockpitPopulatedField<Partial<LocationSchema>>,
	TTickets extends CockpitPopulatedField<Partial<TicketsSchema>> = CockpitPopulatedField<Partial<TicketsSchema>>,
	> {
	slug: CockpitRequiredField<string>;
	title: CockpitRequiredField<string>;
	date: CockpitRequiredField<string>;
	description: CockpitOptionalField<string>;
	facebookUrl: CockpitOptionalField<string>;
	link: CockpitOptionalField<string>;
	linkType: CockpitOptionalField<'internal' | 'external'>;
	secret: CockpitOptionalField<boolean>;
	type: CockpitOptionalField<EventType>;
	previewImage: CockpitOptionalField<PreviewImagePathOnly>;
	tickets: CockpitOptionalField<TTickets>;
	location: CockpitOptionalField<TLocation>;
}
