const replacerMap = {
	'&auml;': 'ä',
	'&uuml;': 'ü',
	'&ouml;': 'ä',
	'%ndash;': '–',
};

export const rtfToPlain = (content = '') => {
	content = content.replace(/<[^>]*>?/gm, '');
	return Object.keys(replacerMap).reduce(
		(prev, curr) => prev.replace(new RegExp(curr, 'gi'), replacerMap[curr]),
		content
	);
};
