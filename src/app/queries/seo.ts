import gql from 'graphql-tag';
import { CockpitImageSchema } from '../schema/CockpitImageSchema';

export interface SEOEntry {
	id: string;
	title: string;
	description: string;
	og_image: CockpitImageSchema;
	og_title: string;
}

export interface GetSEOQueryResponse {
	seoCollection: SEOEntry[];
}

export const getSEOQuery = gql`
	{
		seoCollection {
			id
			title
			description
			og_title
			og_image {
				path
			}
		}
	}
`;

export interface GetSEOForPageQueryResponse {
	seoCollection: [SEOEntry];
}

export const getSEOForPageQuery = (id: string) => gql`
	{
		seoCollection(filter: { id: "${id}" }) {
			id
			title
			description
			og_title
			og_image {
				path
			}
		}
	}
`;
