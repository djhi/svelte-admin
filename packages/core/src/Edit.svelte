<script lang="ts">
  import { setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import { meta } from "tinro";
  import { capitalize, singularize } from "inflection";
  import { setDataLoadingState } from "./DataLoading";
  import { setPageTitle } from "./pageTitle";
  import { getResource, setResourceRecord } from "./resources";
  import { useGetOne } from "./useGetOne";
  import { useUpdate } from "./useUpdate";
  import { SuccessSideEffectsFunction } from "./types";

  const route = meta();
  export let id = route.params.id;
  const { name: resource } = getResource();

  export let onSuccess: SuccessSideEffectsFunction = (data, sideEffects) => {
    sideEffects.redirect("list", resource);
    sideEffects.notify("Record saved!");
  };
  let resolvedPageTitle = writable(
    `${capitalize(singularize(resource))} #${id}`
  );
  export let pageTitle = undefined;

  const queryParams = { resource, id };
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

  const mutation = useUpdate(
    {
      id,
      resource,
    },
    {
      onSuccess,
    }
  );

  export const save = (values) => {
    $mutation.mutateAsync(values);
  };

  setContext("save", save);
</script>

<slot />
