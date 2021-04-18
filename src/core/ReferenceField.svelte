<script lang="ts">
    import { getContext, setContext } from "svelte";
    import get from 'lodash/get';
    import { useGetOne } from "./useGetOne";

    export let reference;
    export let source;
    const record = getContext('record');
    const referenceId = get(record, source);

    $: queryResult = useGetOne({ resource: reference, id: referenceId });
    $: referenceRecord = $queryResult?.data?.data;
    setContext('record', referenceRecord);
</script>

<slot record={referenceRecord}>
    {JSON.stringify(referenceRecord, null, 4)}
</slot>
