import { CockpitOptionalField, CockpitRequiredField } from './CockpitField';
import { ImageSchema, ImagePathOnlySchema } from './ImageSchema';

export interface TicketsSchema<TImage extends Partial<ImageSchema> = ImagePathOnlySchema> {
	title: CockpitRequiredField<string>;
	enabled: CockpitRequiredField<boolean>;
	externalShopLink: CockpitOptionalField<string>;
	externalShopType: CockpitOptionalField<string>;
	previewImage: CockpitOptionalField<TImage>;
	embeddedContent: CockpitOptionalField<string>; // HTML
	startDate: CockpitOptionalField<string>; // YYYY-MM-DD
	startTime: CockpitOptionalField<string>; // HH:mm
	endDate: CockpitOptionalField<string>; // YYYY-MM-DD
	endTime: CockpitOptionalField<string>; // HH:mm
}
