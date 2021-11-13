import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
import type {
  UseMutationOptions,
  MutationStoreResult,
} from "@sveltestack/svelte-query";
import type {
  UpdateResult,
  UpdateParams,
  ResourceRecord,
  SuccessSideEffectsFunction,
} from "./types";
import { getDataProvider } from "./dataProvider";
import { getResource } from "./resources";
import { getSideEffects } from "./getSideEffects";

export const useUpdate = (
  params?: Partial<UseUpdateParams>,
  options: UseUpdateOptions = {}
): MutationStoreResult<UpdateResult<ResourceRecord>, Error> => {
  const dataProvider = getDataProvider();
  const { name } = getResource();
  const queryClient = useQueryClient();
  const { resource, ...queryParams } = params;
  const { onSuccess: userOnSuccess, ...mutationOptions } = options;

  const resourceName = resource || name;
  const mutationFn = (variables: UpdateParams) => {
    return dataProvider
      .update(resourceName, {
        id: queryParams.id,
        data: variables,
        previousData: queryParams.previousData,
      })
      .then(({ data }) => ({
        data,
      }));
  };

  const onSuccess = (data: UpdateResult<ResourceRecord>) => {
    queryClient.invalidateQueries([resource, "getList"]);
    queryClient.invalidateQueries([resource, "getOne", { id: data.data.id }]);
    queryClient.setQueryData([resource, { id: data.data.id }], data);
    userOnSuccess(data.data, getSideEffects());
  };

  const mutation = useMutation<UpdateResult, Error, UpdateParams>(mutationFn, {
    onSuccess,
    ...mutationOptions,
  });

  // @ts-ignore
  return mutation;
};

export interface UseUpdateParams extends UpdateParams {
  resource?: string;
}

export interface UseUpdateOptions
  extends Omit<
    UseMutationOptions<UpdateResult<ResourceRecord>, Error, UpdateParams, any>,
    "onSuccess"
  > {
  onSuccess?: SuccessSideEffectsFunction;
}
