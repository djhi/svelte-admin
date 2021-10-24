<script lang="ts">
  import get from "lodash/get";
  import { getResourceRecord } from "../core";

  export let source;
  export let label = undefined;
  export let record = undefined;
  const recordFromContext = getResourceRecord();
  $: value = get(record || recordFromContext, source);
</script>

<div>
  {#if label}
    <span class="bx--label">
      <slot name="labelText">
        {label}
      </slot>
    </span>
  {/if}
  <div>{value}</div>
</div>
