import gql from 'graphql-tag';

export interface NavigationQueryResponse {
	navigationSingleton: {
		eventsTitle: string;
		galleriesTitle: string;
		aboutTitle: string;
		ticketsTitle: string;
		contactTitle: string;
		homeTitle: string;
	};
}

export const getNavigationQuery = () => gql`
{
  navigationSingleton {
    eventsTitle
    galleriesTitle
    aboutTitle
    ticketsTitle
		homeTitle
		contactTitle
  }
}
`;
