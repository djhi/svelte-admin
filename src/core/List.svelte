<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { derived } from "svelte/store";
  import type { Readable } from "svelte/store";
  import type { ListContext, PaginationPayload, SortPayload } from "../types";
  import { useGetList } from "./useGetList";
  import { setDataLoadingState } from "./DataLoading";

  const { name } = getContext("resource");
  const DefaultSort = { field: "id", order: "DESC" };
  const DefaultPagination = { page: 1, perPage: 25 };
  const DefaultFilter = {};

  let pagination = DefaultPagination;
  let sort = DefaultSort;
  let filter = DefaultFilter;
  const queryParams = { resource: name, pagination, sort, filter };
  const queryStore = useGetList(queryParams);
  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
  setContext<Readable<ListContext>>("list", queryStore);
</script>

{#if $queryStore.status === "loading"}
  <slot name="loading">
    <span>Loading...</span>
  </slot>
{:else if $queryStore.status === "error"}
  <slot name="error">
    <span>Error: {$queryStore.error.message}</span>
  </slot>
{:else}
  <slot />
{/if}
