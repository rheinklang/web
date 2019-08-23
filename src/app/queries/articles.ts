import gql from 'graphql-tag';

export interface ArticleSchema {
	_id: string;
	_modified: number;
	title: string;
	author: string;
	excerpt: string;
	content: string;
	tags: string[];
	releaseDate?: string;
	previewImage?: {
		path: string;
		colors: string[]
	};
}

export interface AllArticlesQueryResponse {
	articlesCollection: ArticleSchema[];
}

export const ALL_ARTICLES_QUERY = gql`
{
  articlesCollection {
		_id
    _modified
    title
    author
    excerpt
    content
    tags
    releaseDate
    previewImage {
      path
      colors
    }
  }
}
`
