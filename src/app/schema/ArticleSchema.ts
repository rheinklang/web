import { PreviewImage, PreviewImagePathOnly } from '../types/PreviewImage';

export interface ArticleSchmea<
	TPreviewImage extends Partial<PreviewImage> = PreviewImagePathOnly
	> {
	_id: string;
	title: string;
	author: string;
	content: string;
	tags: string[];
	releaseDate?: string;
	previewImage?: TPreviewImage;
}
