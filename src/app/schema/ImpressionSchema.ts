import { CockpitRequiredField, CockpitOptionalField } from './CockpitField';
import { ImageSchema } from './ImageSchema';

export interface ImpressionSchema {
	slug: CockpitRequiredField<string>;
	title: CockpitRequiredField<string>;
	description: CockpitOptionalField<string>;
	images: Array<{ value: ImageSchema }>;
	showcaseImage: ImageSchema;
}
