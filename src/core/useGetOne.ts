import { derived, Readable } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseQueryOptions,
  UseQueryStoreResult,
} from "@sveltestack/svelte-query";
import merge from "lodash/merge";
import type {
  GetOneResult,
  GetOneParams,
  Identifier,
  ResourceRecord,
  ResourceRecordMap,
} from "../types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";

export const useGetOne = (
  params?: UseGetOneParams,
  options: UseQueryOptions<
    GetOneResult<ResourceRecord>,
    Error,
    GetOneResult<ResourceRecord>,
    [string, UseGetOneParams]
  > = {
    enabled: true,
  }
): UseGetOneResult => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();
  const { resource, ...queryParams } = params;

  const resourceName = resource || name;
  const queryFn = ({ queryKey }) => {
    return dataProvider.getOne(queryKey[0], queryKey[1]).then(({ data }) => ({
      data,
      ...queryKey[1],
    }));
  };

  const initialData = () => {
    const queryData = queryClient.getQueryData<ResourceRecordMap>(resourceName);
    if (!queryData) return undefined;
    return {
      data: queryData[queryParams.id],
    };
  };

  const onSuccess = (data) => {
    const queryData = queryClient.getQueryData(resourceName);
    queryClient.setQueryData(resourceName, merge({}, queryData, data.data));
  };

  const query = useQuery<
    GetOneResult,
    Error,
    GetOneResult,
    [string, UseGetOneParams]
  >({
    queryKey: [resourceName, queryParams],
    queryFn,
    staleTime: 1000,
    keepPreviousData: true,
    ...options,
  });

  // @ts-ignore
  query.setId = (
    id: Identifier,
    newOptions: UseQueryOptions<
      GetOneResult<ResourceRecord>,
      Error,
      GetOneResult<ResourceRecord>,
      [string, UseGetOneParams]
    > = {
      enabled: true,
    }
  ) => {
    const finalOptions: UseQueryOptions<
      GetOneResult<ResourceRecord>,
      Error,
      GetOneResult<ResourceRecord>,
      [string, UseGetOneParams]
    > = {
      queryKey: [resourceName, { ...queryParams, id }],
      queryFn,
      staleTime: 1000,
      keepPreviousData: true,
      ...options,
      ...newOptions,
    };
    query.setOptions(finalOptions);
  };

  // @ts-ignore
  return query;
};

export interface UseGetOneParams extends GetOneParams {
  resource?: string;
  id: Identifier;
}

export interface UseGetOneResult
  extends UseQueryStoreResult<
    GetOneResult<ResourceRecord>,
    Error,
    GetOneResult<ResourceRecord>,
    [string, UseGetOneParams]
  > {
  data: Readable<GetOneResult>;
  setId: (
    id: Identifier,
    newOptions?: UseQueryOptions<
      GetOneResult<ResourceRecord>,
      Error,
      GetOneResult<ResourceRecord>,
      [string, UseGetOneParams]
    >
  ) => void;
}
