import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseMutationOptions,
  MutationStoreResult,
} from "@sveltestack/svelte-query";
import merge from "lodash/merge";
import type {
  CreateResult,
  CreateParams,
  ResourceRecord,
  SuccessSideEffectsFunction,
} from "./types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";
import { getSideEffects } from "./getSideEffects";

export const useCreate = (
  params?: Partial<UseCreateParams>,
  options: UseCreateOptions = {}
): MutationStoreResult<CreateResult<ResourceRecord>, Error> => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();
  const { resource, ...queryParams } = params;
  const { onSuccess: userOnSuccess, ...mutationOptions } = options;

  const resourceName = resource || name;
  const mutationFn = (variables: CreateParams) => {
    return dataProvider
      .create(resourceName, { data: variables })
      .then(({ data }) => ({
        data,
      }));
  };

  const onSuccess = (
    data: CreateResult<ResourceRecord>,
    variables: CreateParams
  ) => {
    queryClient.invalidateQueries([resource, "getList"]);
    const record = merge(data.data, variables.data);
    queryClient.setQueryData([resource, { id: data.data.id }], {
      data: record,
    });
    userOnSuccess(record, getSideEffects());
  };

  const mutation = useMutation<CreateResult, Error, CreateParams>(mutationFn, {
    onSuccess,
    ...mutationOptions,
  });

  // @ts-ignore
  return mutation;
};

export interface UseCreateParams extends CreateParams {
  resource?: string;
}

export interface UseCreateOptions
  extends Omit<
    UseMutationOptions<CreateResult<ResourceRecord>, Error, CreateParams, any>,
    "onSuccess"
  > {
  onSuccess?: SuccessSideEffectsFunction;
}
