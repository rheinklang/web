import { environment } from '../../environments/environment';

export const transparentBase64InlineImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=`;

export const resolveCDNImagePath = (
	imageField: { path: string },
	fallback: any = transparentBase64InlineImage
) => (imageField && imageField.path ? `${environment.assetCDNHost}${imageField.path}` : fallback);

export const resolveCDNAssetPath = (
	imageField: { path: string },
	fallback: any = transparentBase64InlineImage
) =>
	imageField && imageField.path
		? `${environment.assetCDNHost}/storage/uploads${imageField.path}`
		: fallback;

export const resolveDynamicImagePath = (
	imageField: { path: string },
	fallback: any = transparentBase64InlineImage
) =>
	imageField && imageField.path
		? `${environment.assetCDNHost}/api/cockpit/image?token=${environment.cockpitAPIKey}&src=${imageField.path}&o=1`
		: fallback;

export const resolveDynamicAssetPath = (
	imageField: { path: string },
	fallback: any = transparentBase64InlineImage
) => {
	if (imageField && imageField.path) {
		// weird cockpit behaviour sometimes automatically adds the storage uploads prefix
		imageField.path = imageField.path.replace('/storage/uploads', '');
	}

	return imageField && imageField.path
		? // tslint:disable-next-line: max-line-length
		  `${environment.assetCDNHost}/api/cockpit/image?token=${environment.cockpitAPIKey}&src=/storage/uploads${imageField.path}&o=1`
		: fallback;
};
