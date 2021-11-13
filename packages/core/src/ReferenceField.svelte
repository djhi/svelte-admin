<script lang="ts">
  import lodashGet from "lodash/get";
  import { useGetOne } from "./useGetOne";
  import { getResourceRecord, setResourceRecord } from "./resources";
  import { derived, get } from "svelte/store";
  import { setDataLoadingState } from "./DataLoading";

  export let reference;
  export let source;
  export let record = undefined;
  const recordFromContext = getResourceRecord();
  // By calling svelte get we ensure we retrieve the reference id
  // immediately without subscribing (async access)
  let referenceId = lodashGet(record || get(recordFromContext), source);
  // We still subscribe to the record store to ensure we get updated
  $: {
    referenceId = lodashGet(record || $recordFromContext, source);
  }

  const queryStore = useGetOne(
    { resource: reference, id: referenceId },
    { enabled: referenceId != undefined }
  );

  $: {
    queryStore.setId(referenceId, { enabled: !!referenceId });
  }
  const referenceRecord = derived(queryStore, ($query) => $query?.data?.data);
  setResourceRecord(referenceRecord);

  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
</script>

<slot />
