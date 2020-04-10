const replacerMap = {
	'&auml;': 'ä',
	'&uuml;': 'ü',
	'&ouml;': 'ä',
	'&ugrave;': 'ù',
	'%ndash;': '–',
};

export const rtfToPlain = (content = '') => {
	content = content.replace(/<br\s?\/>/gm, ' ');
	content = content.replace(/<[^>]*>?/gm, '');
	return Object.keys(replacerMap)
		.reduce((prev, curr) => prev.replace(new RegExp(curr, 'gi'), replacerMap[curr]), content)
		.trim();
};
