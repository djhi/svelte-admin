<script lang="ts">
  import { readable } from "svelte/store";
  import { setResourceRecord } from "../core";
  export let record;

  setResourceRecord(readable(record));
</script>

<slot />
