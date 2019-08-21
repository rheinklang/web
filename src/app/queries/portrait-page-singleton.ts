import gql from 'graphql-tag';

export interface GetPortraitPageQueryResult {
	portraitPageSingleton: {
		groupPortraitImage: {
			path: string;
		};
		groupPortraitDescription: string;
		visibleMemberList: { _id: string }[];
	};
}

export const getPortraitPageQuery = () => gql`
{
  portraitPageSingleton {
    groupPortraitImage {
      path
    }
		groupPortraitDescription
    visibleMemberList {
      _id
    }
  }
}
`;
