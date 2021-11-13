<script lang="ts">
  import { getResource, List } from "../core";
  import CreateButton from "./CreateButton.svelte";

  export let pagination = undefined;
  export let sort = undefined;
  export let filter = undefined;
  export let pageTitle = undefined;
  const resource = getResource();
</script>

<slot name="actions">
  <div class="actions list-actions">
    {#if resource.hasCreate}
      <CreateButton />
    {/if}
  </div>
</slot>
<List {pagination} {sort} {filter} {pageTitle}>
  <slot />
</List>

<style lang="scss">
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
</style>
