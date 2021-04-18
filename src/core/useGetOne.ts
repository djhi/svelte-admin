import { getContext } from "svelte";
import { useQuery } from '@sveltestack/svelte-query'
import type { DataProvider, GetOneResult, GetOneParams } from "../types";

export const useGetOne = (params?: Partial<UseGetOneParams>) => {
    const dataProvider = getContext<DataProvider>('dataProvider');
    const { name } = getContext('resource');
    const { resource, ...queryParams } = params;

    const resourceName = resource || name;

    const query = useQuery<GetOneResult, Error>(
        [resourceName, queryParams],
        ({ queryKey }) => dataProvider.getOne(queryKey[0], queryKey[1]),
        {
            staleTime: 1000,
        }
    );

    return query;
}

export interface UseGetOneParams extends GetOneParams {
    resource?: string;
}
