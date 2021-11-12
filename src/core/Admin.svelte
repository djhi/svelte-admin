<script lang="ts">
  import { setContext } from "svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  import type { DataProvider } from "./types";
  export let dataProvider: DataProvider;

  setContext("dataProvider", dataProvider);
  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
