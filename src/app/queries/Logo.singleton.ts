import gql from 'graphql-tag';
import { PreviewImage } from '../types/PreviewImage';

export interface LogoQueryResponse<N extends string = string> {
	logosSingleton: {
		[name in N]: PreviewImage
	};
}

export const getDynamicLogoQuery = (select: string) => gql`
	query GetDynamicLogoFor${select} {
		logosSingleton {
			${select} {
				path
				meta
			}
		}
	}
	`;
