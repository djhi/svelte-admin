<script lang="ts">
    import { getContext } from "svelte";
    import type { ResourceRecord } from "../types";

    export let source;
    const record = getContext<ResourceRecord>('record');
</script>

<style>
	span {
        display: block;
        text-align: right;
    }
</style>

<span>{record[source]}</span>
