<script lang="ts">
  import { derived, writable } from "svelte/store";
  import { capitalize, singularize } from "inflection";
  import { meta } from "tinro";
  import { setDataLoadingState } from "./DataLoading";
  import { getResource, setResourceRecord } from "./resources";
  import { useGetOne } from "./useGetOne";
  import { setPageTitle } from "./pageTitle";

  const route = meta();
  export let id = route.params.id;
  const { name } = getResource();
  let resolvedPageTitle = writable(`${capitalize(singularize(name))} #${id}`);
  export let pageTitle = undefined;

  const queryParams = { resource: name, id };
  const queryStore = useGetOne(queryParams);
  const record = derived(queryStore, ($query) => $query?.data?.data);
  setResourceRecord(record);

  $: {
    if (typeof pageTitle === "function" && !!$record) {
      const title = pageTitle($record);
      resolvedPageTitle.set(title);
    }

    setPageTitle($resolvedPageTitle);
  }

  const dataLoadingContext = derived(queryStore, ($query) => ({
    status: $query.status,
    error: $query.error,
  }));
  setDataLoadingState(dataLoadingContext);
</script>

<slot />
