<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { meta } from "tinro";
  import { capitalize, singularize } from "inflection";
  import { setPageTitle } from "./pageTitle";
  import { getResource } from "./resources";
  import { useCreate } from "./useCreate";
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

  $: {
    if (typeof pageTitle === "function") {
      const title = pageTitle();
      resolvedPageTitle.set(title);
    }

    setPageTitle($resolvedPageTitle);
  }

  const mutation = useCreate(
    {
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
