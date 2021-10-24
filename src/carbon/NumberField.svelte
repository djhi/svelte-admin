<script lang="ts">
  import get from "lodash/get";
  import { getResourceRecord } from "../core";

  export let source;
  export let record = undefined;
  export let label = undefined;
  const recordFromContext = getResourceRecord();
  const value = get(record || recordFromContext, source);
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
