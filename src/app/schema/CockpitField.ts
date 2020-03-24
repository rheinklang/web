export interface ICockpitGenericField {
	_id: string;
}

export type CockpitOptionalField<TData> = TData | null;

export type CockpitRequiredField<TData> = TData;

export type CockpitPopulatedField<TData> = TData | null;
