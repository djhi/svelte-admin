<script lang="ts">
  import { getContext, setContext } from "svelte";
  import get from "lodash/get";
  import { useGetOne } from "./useGetOne";
  import { getResourceRecord, setResourceRecord } from "./resources";
  import { derived } from "svelte/store";
  import { setDataLoadingState } from "./DataLoading";

  export let reference;
  export let source;
  export let record = undefined;
  const recordFromContext = getResourceRecord();
  let referenceId;
  $: referenceId = get(record || $recordFromContext, source);
  const queryStore = useGetOne(
    { resource: reference, id: referenceId },
    !!referenceId
  );

  $: {
    queryStore.setId(referenceId);
  }
  const referenceRecord = derived(queryStore, ($query) => $query?.data);
  setResourceRecord(referenceRecord);

  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
</script>

<slot />
