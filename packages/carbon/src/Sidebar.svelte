<script lang="ts">
  import { SideNav, SideNavItems, SideNavLink } from "carbon-components-svelte";
  import { router } from "tinro";
  import { resourceStore } from "@svelte-admin/core";
  export let isSideNavOpen;
</script>

<SideNav fixed bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    {#each $resourceStore.byIndex as resource}
      <SideNavLink
        text={resource.name}
        href={`/${resource.name}`}
        isSelected={$router.path === `/${resource.name}`}
      />
    {/each}
  </SideNavItems>
</SideNav>
