export interface HotlinkSchema {
	label: string;
	url: string;
	category: 'important' | 'social' | 'forms' | 'pages' | 'streams';
	internal: boolean;
	queryParams: string; // serialized JSON
}
export interface ParsedHotlinkSchema {
	label: string;
	url: string;
	category: 'important' | 'social' | 'forms' | 'pages' | 'streams';
	internal: boolean;
	queryParams: object;
}
