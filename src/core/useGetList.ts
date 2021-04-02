import { getContext } from "svelte";
import { useQuery } from '@sveltestack/svelte-query'
import type { DataProvider, GetListResult, GetListParams } from "../types";


export const useGetList = (params?: Partial<UseGetListParams>) => {
    const dataProvider = getContext<DataProvider>('dataProvider');
    const { resource, ...listParams } = params;

    const resourceName = resource || name;

    const query = useQuery<GetListResult, Error>(
        [resourceName, listParams],
        ({ queryKey }) => {
            return dataProvider.getList(queryKey[0], queryKey[1]);
        },
        {
            staleTime: 1000,
        }
    );

    return query;
}

export interface UseGetListParams extends GetListParams {
    resource?: string;
}
