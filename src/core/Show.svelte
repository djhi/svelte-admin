<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { derived } from "svelte/store";
  import { meta } from "tinro";
  import type { ResourceRecord } from "../types";
  import { useGetOne } from "./useGetOne";

  const route = meta();
  export let id = route.params.id;
  const { name } = getContext("resource");

  const queryParams = { resource: name, id };
  const queryStore = useGetOne(queryParams);
  const record = derived(queryStore, ($query) => $query.data);
  $: setContext<ResourceRecord>("record", $queryStore.data);
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
