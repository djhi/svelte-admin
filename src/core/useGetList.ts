import { getContext } from "svelte";
import { useQuery } from '@sveltestack/svelte-query'
import type {
    DataProvider,
    GetListParams,
    GetListResult,
    PaginationPayload,
    SortPayload
} from "../types";
import { derived } from "svelte/store";

export const useGetList = (params: Partial<UseGetListParams>) => {
    const dataProvider = getContext<DataProvider>('dataProvider');
    const { name } = getContext('resource');
    let {
        resource,
        ...queryParams
    } = params;

    const resourceName = resource || name;
    const queryFn = ({ queryKey }) => {
        return dataProvider.getList(queryKey[0], queryKey[1]).then(({ data, total }) => ({
            data,
            total,
            ...queryKey[1]
        }));
    };
    const query = useQuery<GetListResult & GetListParams, Error>(
        [resourceName, queryParams],
        queryFn,
        {
            staleTime: 1000,
        }
    );

    const result = derived(query, (queryResult) => ({
        data: queryResult.data?.data,
        total: queryResult.data?.total,
        status: queryResult.status,
        error: queryResult.error,
        pagination: queryResult.data?.pagination,
        sort: queryResult.data?.sort,
        filter: queryResult.data?.filter,
        setPagination: (newPagination: Partial<PaginationPayload>) => {
            query.setOptions({
                queryFn,
                queryKey: [
                    resourceName,
                    {
                        ...queryParams,
                        pagination: { ...queryParams.pagination, ...newPagination }
                    }
                ]
            });
        },
        setSort: (newSort: Partial<SortPayload>) => {
            query.setOptions({
                queryFn,
                queryKey: [
                    resourceName,
                    {
                        ...queryParams,
                        sort: { ...queryParams.sort, ...newSort },
                    }
                ]
            });
        },
        setFilter: (newFilter: any) => {
            query.setOptions({
                queryFn,
                queryKey: [
                    resourceName,
                    {
                        ...queryParams,
                        filter: newFilter,
                    }
                ]
            });
        },
    }));

    return result;
}

export interface UseGetListParams extends GetListParams {
    resource?: string;
}
