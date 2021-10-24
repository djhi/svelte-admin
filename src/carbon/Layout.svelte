<script lang="ts">
  import { Content } from "carbon-components-svelte";
  import Appbar from "./Appbar.svelte";
  import Sidebar from "./Sidebar.svelte";
  export let title = "";
  let isSideNavOpen = false;
</script>

<slot name="header"><Appbar company={title} bind:isSideNavOpen /></slot>
<slot name="sidebar"><Sidebar bind:isSideNavOpen /></slot>
<Content>
  <slot />
</Content>
<slot name="footer" />
