<script lang="ts">
  import get from "lodash/get";
  import { Button } from "carbon-components-svelte";
  import { getResource, getResourceRecord, resourceStore } from "../core";

  export let record = undefined;
  const recordFromContext = getResourceRecord();
  const resource = getResource();
</script>

<Button
  href={`/${resource.name}/${(record || recordFromContext).id}/show`}
  size="small">Show</Button
>
