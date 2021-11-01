<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { derived } from "svelte/store";
  import { useGetList, UseGetListResult } from "./useGetList";
  import { setDataLoadingState } from "./DataLoading";

  const { name } = getContext("resource");
  const DefaultSort = { field: "id", order: "ASC" };
  const DefaultPagination = { page: 1, perPage: 10 };
  const DefaultFilter = {};

  export let pagination = DefaultPagination;
  export let sort = DefaultSort;
  export let filter = DefaultFilter;
  const queryParams = { resource: name, pagination, sort, filter };
  const queryStore = useGetList(queryParams);
  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
  setContext<UseGetListResult>("list", queryStore);
</script>

{#if $queryStore.status === "error"}
  <slot name="error">
    <span>Error: {$queryStore.error.message}</span>
  </slot>
{:else}
  <slot />
{/if}
