import { isNumber } from 'util';

const TEMPLATE_EXPRESSION = /\{([0-9a-zA-Z_\$\^\!\?]+)\}/g;

export type TemplateKey = string | number;

export type TemplateValue = string | number | boolean | undefined | null | { path: string };

export function template(value: string = '', data: Record<TemplateKey, TemplateValue> | TemplateValue[] = {}): string {
	let args: Record<TemplateKey, TemplateValue> | TemplateValue[] = {};

	if (value && data && typeof data === 'object') {
		args = data;
	} else {
		args = new Array(arguments.length - 1);
		for (let i = 1; i < arguments.length; ++i) {
			args[i - 1] = arguments[i];
		}
	}

	return value.replace(TEMPLATE_EXPRESSION, function replaceArg(match, i, index) {
		let result: TemplateValue | null;

		if (value[index - 1] === '{' && value[index + match.length] === '}') {
			return i;
		} else {
			result = args.hasOwnProperty(i) ? args[i] : null;

			if (result === null || result === undefined) {
				return '';
			}

			return result;
		}
	});
}

export const pluralize = (num: number, singular: string, plural: string, fallback: string = '') => {
	if (!isNumber(num) || num === 0) {
		return fallback;
	}

	return num === 1 ? `1 ${singular}` : `${num} ${plural}`;
};
