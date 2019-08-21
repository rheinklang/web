import gql from 'graphql-tag';

export interface GetTeamQuerySingleTeamMember {
	_id: string;
	fullName: string;
	image: {
		path: string | null;
	};
	lead: boolean;
	founder: boolean;
	description: string;
	mainRole: string;
	sideRole: string;
}

export interface GetTeamQueryResponse {
	teamCollection: GetTeamQuerySingleTeamMember[];
}

export const getTeamQuery = () => gql`
{
  teamCollection(sort: { founder: true, lead: true, fullName: "asc" }) {
    _id
    fullName
    image {
      path
    }
		description
		lead
		founder
    mainRole
    sideRole
  }
}
`;
