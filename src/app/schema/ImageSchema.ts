export interface ImagePathOnlySchema {
	path: string;
}

export interface ImageWithColorsSchema extends ImagePathOnlySchema {
	colors: string[];
}

export interface ImageSchema {
	path: string;
	colors: string[];
	mime: string;
	title: string;
}
