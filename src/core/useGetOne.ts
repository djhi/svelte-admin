import { derived } from "svelte/store";
import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
import merge from "lodash/merge";
import type {
  GetOneResult,
  GetOneParams,
  Identifier,
  ResourceRecordMap,
} from "../types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";

export const useGetOne = (params?: UseGetOneParams) => {
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
  const query = useQuery<
    GetOneResult,
    Error,
    GetOneResult,
    [string, UseGetOneParams]
  >([resourceName, queryParams], queryFn, {
    staleTime: 1000,
    initialData: () => {
      const queryData =
        queryClient.getQueryData<ResourceRecordMap>(resourceName);
      if (!queryData) return undefined;
      console.log({ queryData });
      return {
        data: queryData[queryParams.id],
      };
    },
    onSuccess: (data) => {
      const queryData = queryClient.getQueryData(resourceName);
      queryClient.setQueryData(resourceName, merge({}, queryData, data.data));
    },
  });

  const result = derived(query, (queryResult) => ({
    data: queryResult.data?.data,
    status: queryResult.status,
    error: queryResult.error,
  }));

  return result;
};

export interface UseGetOneParams extends GetOneParams {
  resource?: string;
  id: Identifier;
}
