<script lang="ts">
    import { setContext } from "svelte";
    import type { ResourceRecord } from "../types";
    export let record;

    setContext<ResourceRecord>('record', record);
</script>

<slot />
