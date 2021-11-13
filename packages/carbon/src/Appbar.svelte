<script lang="ts">
  import { Header, SkipToContent } from "carbon-components-svelte";
  import { pageTitle } from "@svelte-admin/core";
  export let company = "";
  export let isSideNavOpen;
</script>

<Header
  {company}
  platformName={$pageTitle}
  persistentHamburgerMenu={true}
  bind:isSideNavOpen
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <slot />
</Header>
