<script lang="ts">
  import { setContext } from "svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  import type { DataProvider } from "./types";
  import { resourceStore } from "./resources";
  import { router } from "tinro";
  export let dataProvider: DataProvider;

  setContext("dataProvider", dataProvider);
  const queryClient = new QueryClient();

  $: {
    if ($resourceStore?.byIndex && $resourceStore.byIndex.length) {
      const resource = $resourceStore.byIndex[0];
      router.goto(`/${resource.name}`);
    }
  }
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
