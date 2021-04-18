<script lang="ts">
    import { getContext } from "svelte";
    import get from 'lodash/get';
    import type { ResourceRecord } from "../types";

    export let source;
    export let record;
    const recordFromContext = getContext<ResourceRecord>('record');
    const value = get((record || recordFromContext), source);
</script>

<span>{value}</span>
