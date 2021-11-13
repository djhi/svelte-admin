<script lang="ts">
  import { TextInputSkeleton } from "carbon-components-svelte";

  import get from "lodash/get";
  import { getIsLoading, getResourceRecord } from "@svelte-admin/core";

  export let source;
  export let label = undefined;
  export let record = undefined;
  const recordFromContext = getResourceRecord();
  $: value = get(record || $recordFromContext, source);
  const isLoading = getIsLoading();
</script>

{#if $isLoading}
  <TextInputSkeleton hideLabel={!label} {...$$restProps} />
{:else}
  <div {...$$restProps}>
    {#if label}
      <span class="bx--label">
        <slot name="labelText">
          {label}
        </slot>
      </span>
    {/if}
    <div>{value}</div>
  </div>
{/if}
