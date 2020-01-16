import { CockpitOptionalField, CockpitRequiredField } from './CockpitField';

export interface LocationSchema {
	name: CockpitRequiredField<string>;
	city: CockpitOptionalField<string>;
	canton: CockpitOptionalField<string>;
	country: CockpitOptionalField<string>;
	googleMapsURL: CockpitOptionalField<string>;
	zoomLevel: CockpitOptionalField<string>;
}
