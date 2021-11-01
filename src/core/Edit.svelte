<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { derived } from "svelte/store";
  import { meta } from "tinro";
  import type { ResourceRecord } from "../types";
  import { setDataLoadingState } from "./DataLoading";
  import { setResourceRecord } from "./resources";
  import { useGetOne } from "./useGetOne";

  const route = meta();
  export let id = route.params.id;
  const { name } = getContext("resource");

  const queryParams = { resource: name, id };
  const queryStore = useGetOne(queryParams);
  const record = derived(queryStore, ($query) => $query.data);
  setResourceRecord(record);
  export const status = derived(queryStore, ($query) => $query.status);
  export const error = derived(queryStore, ($query) => $query.error);
  export const data = derived(queryStore, ($query) => $query.data);
  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
  export const save = (values) => {
    console.log({ values });
  };
</script>

<slot />
