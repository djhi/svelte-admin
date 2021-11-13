import { Readable } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseQueryOptions,
  UseQueryStoreResult,
} from "@sveltestack/svelte-query";
import type {
  GetOneResult,
  GetOneParams,
  Identifier,
  ResourceRecord,
} from "./types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";

export const useGetOne = (
  params?: UseGetOneParams,
  options: UseQueryOptions<
    GetOneResult<ResourceRecord>,
    Error,
    GetOneResult<ResourceRecord>,
    UseGetOneQueryKey
  > = {
    enabled: true,
  }
): UseGetOneResult => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();
  const { resource, ...queryParams } = params;

  const resourceName = resource || name;
  const queryFn = ({ queryKey }: { queryKey: UseGetOneQueryKey }) => {
    return dataProvider.getOne(queryKey[0], queryKey[2]).then(({ data }) => ({
      data,
      ...queryKey[2],
    }));
  };

  const query = useQuery<GetOneResult, Error, GetOneResult, UseGetOneQueryKey>({
    queryKey: [resourceName, "getOne", queryParams],
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
      UseGetOneQueryKey
    > = {
      enabled: true,
    }
  ) => {
    const finalOptions: UseQueryOptions<
      GetOneResult<ResourceRecord>,
      Error,
      GetOneResult<ResourceRecord>,
      UseGetOneQueryKey
    > = {
      queryKey: [resourceName, "getOne", { ...queryParams, id }],
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
}

export interface UseGetOneResult
  extends UseQueryStoreResult<
    GetOneResult<ResourceRecord>,
    Error,
    GetOneResult<ResourceRecord>,
    UseGetOneQueryKey
  > {
  data: Readable<GetOneResult>;
  setId: (
    id: Identifier,
    newOptions?: UseQueryOptions<
      GetOneResult<ResourceRecord>,
      Error,
      GetOneResult<ResourceRecord>,
      UseGetOneQueryKey
    >
  ) => void;
}

type UseGetOneQueryKey = [string, "getOne", UseGetOneParams];
