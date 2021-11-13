<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { getResource } from "@svelte-admin/core";

  const resource = getResource();
</script>

<Button
  href={`/${resource.name}/create`}
  size="small"
  kind="primary"
  {...$$restProps}>Create</Button
>
