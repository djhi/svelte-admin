import { get, Readable, writable } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseQueryOptions,
  UseQueryStoreResult,
} from "@sveltestack/svelte-query";
import debounce from "lodash/debounce";
import type {
  FilterPayload,
  GetListParams,
  GetListResult,
  PaginationPayload,
  ResourceRecord,
  SortPayload,
} from "./types";
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
  const pagination = writable(params.pagination || { page: 1, perPage: 10 });
  const sort = writable(params.sort || { field: "id", order: "asc" });
  const filter = writable(params.filter || {});

  const queryFn = ({ queryKey }: { queryKey: UseGetListQueryKey }) => {
    return dataProvider
      .getList(queryKey[0], queryKey[1])
      .then(({ data, total }) => ({
        data,
        total,
      }));
  };

  const onSuccess = (data) => {
    data.data.forEach((record) => {
      const queryKey = [resourceName, { id: record.id.toString() }];
      queryClient.setQueryData(queryKey, { data: record });
    });
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
        pagination: get(pagination),
        sort: get(sort),
        filter: get(filter),
      },
    ],
    queryFn,
    staleTime: 1000,
    keepPreviousData: true,
    onSuccess,
    ...options,
  });

  const setPagination = (newPagination: Partial<PaginationPayload>) => {
    pagination.update((oldPagination) => ({
      ...oldPagination,
      ...newPagination,
    }));
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          pagination: get(pagination),
          sort: get(sort),
          filter: get(filter),
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      onSuccess,
      ...options,
    });
  };
  const setSort = (newSort: Partial<SortPayload>) => {
    sort.update((oldSort) => ({
      ...oldSort,
      ...newSort,
    }));
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          pagination: get(pagination),
          sort: get(sort),
          filter: get(filter),
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      onSuccess,
      ...options,
    });
  };
  const setFilter = debounce((newFilter: FilterPayload) => {
    filter.set(newFilter);
    query.setOptions({
      queryFn,
      queryKey: [
        resourceName,
        {
          pagination: get(pagination),
          sort: get(sort),
          filter: get(filter),
        },
      ],
      staleTime: 1000,
      keepPreviousData: true,
      onSuccess,
      ...options,
    });
  }, 150);

  const subscribe = (subscriber) => {
    return query.subscribe((queryValue) => {
      subscriber({
        ...queryValue,
        pagination: get(pagination),
        sort: get(sort),
        filter: get(filter),
      });
    });
  };

  const result = {
    ...query,
    subscribe,
    setPagination,
    setSort,
    setFilter,
  };

  return result;
};

export interface UseGetListParams extends GetListParams {
  resource?: string;
}

export interface UseGetListResult
  extends UseQueryStoreResult<
    GetListResult<ResourceRecord>,
    Error,
    GetListResult<ResourceRecord> & {
      pagination: Readable<PaginationPayload>;
      sort: Readable<SortPayload>;
      filter: Readable<FilterPayload>;
    },
    [string, UseGetListParams]
  > {
  setPagination: (newPagination: Partial<PaginationPayload>) => void;
  setSort: (newSort: Partial<SortPayload>) => void;
  setFilter: (newFilter: FilterPayload) => void;
}

type UseGetListQueryKey = [string, UseGetListParams];
