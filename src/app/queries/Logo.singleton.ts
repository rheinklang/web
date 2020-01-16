import gql from 'graphql-tag';
import { PreviewImage } from '../types/PreviewImage';

export interface LogoQueryResponse<N extends string = string> {
	logosSingleton: {
		[name in N]: PreviewImage;
	};
}

export const getDynamicLogoQuery = (select: string) => gql`
	query GetDynamicLogoFor_${select} {
		logosSingleton {
			${select} {
				path
				meta
			}
		}
	}
	`;
