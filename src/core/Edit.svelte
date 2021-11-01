<script lang="ts">
  import { setContext } from "svelte";
  import { derived, get, writable } from "svelte/store";
  import { meta } from "tinro";
  import { capitalize, singularize } from "inflection";
  import { useMutation } from "@sveltestack/svelte-query";
  import { setDataLoadingState } from "./DataLoading";
  import { setPageTitle } from "./pageTitle";
  import { getResource, setResourceRecord } from "./resources";
  import { useGetOne } from "./useGetOne";
  import { getDataProvider } from "./dataProvider";

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

  const dataProvider = getDataProvider();
  const mutation = useMutation((values) => {
    return dataProvider.update(name, {
      id,
      data: values,
      previousData: get(record),
    });
  });

  export const save = (values) => {
    return $mutation.mutateAsync(values);
  };

  setContext("save", save);
</script>

<slot />
