import { ImagePathOnlySchema } from './ImageSchema';
import { CockpitOptionalField, CockpitRequiredField } from './CockpitField';

export interface TeamSchema {
	_id: CockpitRequiredField<string>;
	fullName: CockpitRequiredField<string>;
	image: CockpitOptionalField<ImagePathOnlySchema>;
	lead: CockpitOptionalField<boolean>;
	founder: CockpitOptionalField<boolean>;
	description: CockpitOptionalField<string>;
	mainRole: CockpitOptionalField<string>;
	sideRole: CockpitOptionalField<string>;
}
