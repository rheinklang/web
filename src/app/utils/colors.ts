import { ImageSchema } from '../schema/ImageSchema';

/* about half of 256. Lower threshold equals more dark text on dark background  */
const threshold = 130;

// tslint:disable-next-line: triple-equals
const cutHex = (h: string) => (h.charAt(0) == '#' ? h.substring(1, 7) : h);
const hexToR = (h: string) => parseInt(cutHex(h).substring(0, 2), 16);
const hexToG = (h: string) => parseInt(cutHex(h).substring(2, 4), 16);
const hexToB = (h: string) => parseInt(cutHex(h).substring(4, 6), 16);

export const getContrastColor = (hex: string) => {
	const hRed = hexToR(hex);
	const hGreen = hexToG(hex);
	const hBlue = hexToB(hex);
	const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;

	return cBrightness > threshold ? { hex: '#000000', modifier: 'black' } : { hex: '#ffffff', modifier: 'white' };
};

export const getContrastModifierForImage = (image?: ImageSchema, toHex = false) => {
	if (!image || !image.colors || image.colors.length === 0) {
		return toHex ? '#ffffff' : 'white';
	}

	const [primaryColor] = image.colors;
	const computedColor = getContrastColor(primaryColor);
	return toHex ? computedColor.hex : computedColor.modifier;
};
