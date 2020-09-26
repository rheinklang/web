import { CockpitRequiredField } from './CockpitField';

export interface IPopupEntrySchema {
	guid: CockpitRequiredField<string>;
	surname: CockpitRequiredField<string>;
	lastname: CockpitRequiredField<string>;
	email: CockpitRequiredField<string>;
	telephone: CockpitRequiredField<string>;
	address: CockpitRequiredField<string>;
	eventId: CockpitRequiredField<number>;
}
