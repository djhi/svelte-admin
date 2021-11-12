<script lang="ts">
  import lodashGet from "lodash/get";
  import { setContext } from "svelte";
  import { derived, get } from "svelte/store";
  import { useGetOne } from "./useGetOne";
  import { setResourceRecord } from "./resources";
  import { getForm } from "./form";
  import { setDataLoadingState } from "./DataLoading";
  import { useGetList } from "./useGetList";
  import { ReferenceInputContext } from "./types";

  export let reference;
  export let source;

  const { form } = getForm();

  // By calling svelte get we ensure we retrieve the reference id
  // immediately without subscribing (async access)
  let referenceId = lodashGet(get(form), source);
  // We still subscribe to the record store to ensure we get updated
  $: {
    referenceId = lodashGet($form, source);
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

  const DefaultSort = { field: "id", order: "ASC" };
  const DefaultPagination = { page: 1, perPage: 10 };
  const DefaultFilter = {};

  export let pagination = DefaultPagination;
  export let sort = DefaultSort;
  export let filter = DefaultFilter;
  const queryParams = { resource: reference, pagination, sort, filter };
  const listQueryStore = useGetList(queryParams);

  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
  setContext<ReferenceInputContext>("reference", {
    ...listQueryStore,
    source,
  });
</script>

<slot />
