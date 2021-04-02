<script lang="ts">
  import { getContext, setContext } from "svelte";
  import type { ListContext, PaginationPayload, SortPayload } from "../types";
  import { useGetList } from "./useGetList";
  const DefaultSort = { field: "id", order: "DESC" };
  const DefaultPagination = { page: 1, perPage: 25 };
  const DefaultFilter = {};

  let pagination = DefaultPagination;
  let sort = DefaultSort;
  let filter = DefaultFilter;

  const { name } = getContext("resource");

  $: queryResult = useGetList({ resource: name, pagination, sort, filter });
  $: data = $queryResult?.data?.data;
  $: total = $queryResult?.data?.total;

  $: context = {
    data,
    total,
    pagination,
    sort,
    filter,
    setPagination: (newPagination: Partial<PaginationPayload>) => {
      pagination = { ...pagination, ...newPagination };
    },
    setSort: (newSort: Partial<SortPayload>) => {
      sort = { ...sort, ...newSort };
    },
    setFilter: (newFilter: any) => {
      filter = newFilter;
    },
  };

  setContext<ListContext>("list", context);
</script>

<h1>List page for resource {name}</h1>

{#if $queryResult.isLoading}
  <slot name="loading">
    <span>Loading...</span>
  </slot>
{:else if $queryResult.isError}
  <slot name="error">
    <span>Error: {$queryResult.error.message}</span>
  </slot>
{:else}
  <slot data={data} total={total} context={context} />
{/if}
