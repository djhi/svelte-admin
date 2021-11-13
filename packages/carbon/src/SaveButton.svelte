<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { getForm } from "@svelte-admin/core";

  const { isSubmitting } = getForm();
</script>

<Button type="submit" size="small" disabled={$isSubmitting}>Submit</Button>
