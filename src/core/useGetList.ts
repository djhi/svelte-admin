import { derived } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import merge from "lodash/merge";
import type {
  GetListParams,
  GetListResult,
  PaginationPayload,
  ResourceRecordMap,
  SortPayload,
} from "../types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";

export const useGetList = (params: Partial<UseGetListParams>) => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();

  let { resource, ...queryParams } = params;

  const resourceName = resource || name;
  const queryFn = ({ queryKey }) => {
    return dataProvider
      .getList(queryKey[0], queryKey[1])
      .then(({ data, total }) => ({
        data,
        total,
        ...queryKey[1],
      }));
  };
  const query = useQuery<GetListResult & GetListParams, Error>(
    [resourceName, queryParams],
    queryFn,
    {
      staleTime: 1000,
      onSuccess: (data) => {
        const queryData =
          queryClient.getQueryData<ResourceRecordMap>(resourceName);
        queryClient.setQueryData(
          resourceName,
          data.data.reduce(
            (acc, item) => ({
              ...acc,
              [item.id]: item,
            }),
            queryData || {}
          )
        );
      },
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
            pagination: { ...queryParams.pagination, ...newPagination },
          },
        ],
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
          },
        ],
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
          },
        ],
      });
    },
  }));

  return result;
};

export interface UseGetListParams extends GetListParams {
  resource?: string;
}
