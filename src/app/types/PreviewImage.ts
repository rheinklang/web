export interface PreviewImagePathOnly {
	path: string;
}

export interface PreviewImageWithColors extends PreviewImagePathOnly {
	colors: string[];
}

export interface PreviewImage {
	path: string;
	colors: string[];
	mime: string;
	title: string;
}
