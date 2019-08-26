import gql from 'graphql-tag';
import { CockpitImageSchema } from '../schema/CockpitImageSchema';

export interface LogoQueryResponse<N extends string = string> {
	logosSingleton: {
		[name in N]: CockpitImageSchema
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
