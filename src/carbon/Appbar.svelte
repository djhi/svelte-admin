<script lang="ts">
  import { Header, SkipToContent } from "carbon-components-svelte";
  export let company = "";
  export let title = "";
  export let isSideNavOpen;
</script>

<Header
  {company}
  platformName={title}
  persistentHamburgerMenu={true}
  bind:isSideNavOpen
>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <slot />
</Header>
