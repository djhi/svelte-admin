<script lang="ts">
  import { SideNav, SideNavItems, SideNavLink } from "carbon-components-svelte";
  import { resourceStore } from "../core/resources";
  export let isSideNavOpen;
</script>

<SideNav fixed bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#each $resourceStore.byIndex as resource}
      <SideNavLink text={resource.name} href={`/${resource.name}`} />
    {/each}
  </SideNavItems>
</SideNav>
