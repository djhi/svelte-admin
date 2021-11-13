<script lang="ts">
  import get from "lodash/get";
  import { Button } from "carbon-components-svelte";
  import {
    getResource,
    getResourceRecord,
    resourceStore,
  } from "@svelte-admin/core";

  export let record = undefined;
  const recordFromContext = getResourceRecord();
  const resource = getResource();
  $: id = get(record || $recordFromContext, "id");
</script>

<Button
  href={`/${resource.name}/${id}`}
  size="small"
  kind="ghost"
  {...$$restProps}>Edit</Button
>
