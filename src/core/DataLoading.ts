import { getContext, setContext } from "svelte";
import { derived } from "svelte/store";
import type { Readable } from "svelte/store";
import type { MutationStatus } from "@sveltestack/svelte-query";

const DataLoadingContextKey = "@@admin/dataLoading";

export type DataLoadingContext = {
  status: MutationStatus;
  error: any;
};

export const setDataLoadingState = (state: Readable<DataLoadingContext>) =>
  setContext(DataLoadingContextKey, state);

export const getDataLoadingState = () =>
  getContext<Readable<DataLoadingContext>>(DataLoadingContextKey);

export const getIsLoading = () => {
  const dataLoadingContext = getContext<Readable<DataLoadingContext>>(
    DataLoadingContextKey
  );

  const isLoading = derived(
    dataLoadingContext,
    ($ctx) => $ctx.status === "idle" || $ctx.status === "loading"
  );

  return isLoading;
};
