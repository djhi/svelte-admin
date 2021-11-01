<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { getForm } from "../core";

  const { isSubmitting } = getForm();
</script>

<Button type="submit" size="small" disabled={$isSubmitting}>Submit</Button>
