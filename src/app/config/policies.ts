import { WatchQueryFetchPolicy, ErrorPolicy } from 'apollo-client';

/**
 * @see https://www.apollographql.com/docs/react/api/react-apollo/#optionsfetchpolicy
 */
export const CACHED_POLICY: WatchQueryFetchPolicy = 'cache-first';

/**
 * @see https://www.apollographql.com/docs/react/api/react-apollo/#optionsfetchpolicy
 */
export const REFETCH_POLICY: WatchQueryFetchPolicy = 'network-only';

/**
 * @see https://www.apollographql.com/docs/react/api/react-apollo/#optionsfetchpolicy
 */
export const CACHE_AND_UPDATE_POLICY: WatchQueryFetchPolicy = 'cache-and-network';

/**
 * @see https://www.apollographql.com/docs/react/features/error-handling/#error-policies
 */
export const ERROR_POLICY: ErrorPolicy = 'ignore';
