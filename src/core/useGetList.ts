import { derived } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseQueryOptions,
  UseQueryStoreResult,
} from "@sveltestack/svelte-query";
import type {
  GetListParams,
  GetListResult,
  Identifier,
  PaginationPayload,
  ResourceRecord,
  ResourceRecordMap,
  SortPayload,
} from "../types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";

export const useGetList = (
  params: Partial<UseGetListParams>,
  options: UseQueryOptions<
    GetListResult<ResourceRecord>,
    Error,
    GetListResult<ResourceRecord>,
    UseGetListQueryKey
  > = {
    enabled: true,
  }
): UseGetListResult => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();

  let { resource, ...queryParams } = params;

  const resourceName = resource || name;
  const queryFn = ({ queryKey }: { queryKey: UseGetListQueryKey }) => {
    return dataProvider
      .getList(queryKey[0], queryKey[1])
      .then(({ data, total }) => ({
        data,
        total,
      }));
  };

  const onSuccess = (data) => {
    const queryData = queryClient.getQueryData<ResourceRecordMap>(resourceName);

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
  };

  const query = useQuery<
    GetListResult,
    Error,
    GetListResult,
    UseGetListQueryKey
  >({
    queryKey: [
      resourceName,
      {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
        filter: {},
        ...queryParams,
      },
    ],
    queryFn,
    staleTime: 1000,
    keepPreviousData: true,
    ...options,
  });

  const setPagination = (newPagination: Partial<PaginationPayload>) => {
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          sort: { field: "id", order: "ASC" },
          filter: {},
          ...queryParams,
          pagination: { ...queryParams.pagination, ...newPagination },
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      ...options,
    });
  };
  const setSort = (newSort: Partial<SortPayload>) => {
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          pagination: { page: 1, perPage: 10 },
          filter: {},
          ...queryParams,
          sort: { ...queryParams.sort, ...newSort },
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      ...options,
    });
  };
  const setFilter = (newFilter: any) => {
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          pagination: { page: 1, perPage: 10 },
          sort: { field: "id", order: "ASC" },
          ...queryParams,
          filter: newFilter,
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      ...options,
    });
  };

  const result = {
    ...query,
    setPagination,
    setSort,
    setFilter,
  };

  // @ts-ignore
  return result;
};

export interface UseGetListParams extends GetListParams {
  resource?: string;
}

export interface UseGetListResult
  extends UseQueryStoreResult<
    GetListResult<ResourceRecord>,
    Error,
    GetListResult<ResourceRecord>,
    [string, UseGetListParams]
  > {
  setPagination: (newPagination: Partial<PaginationPayload>) => void;
  setSort: (newSort: Partial<SortPayload>) => void;
  setFilter: (newFilter: any) => void;
}

type UseGetListQueryKey = [string, UseGetListParams];
