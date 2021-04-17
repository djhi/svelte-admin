<script lang="ts">
    import { Header, SkipToContent } from "carbon-components-svelte";
    export let company;
    export let title;
</script>

<Header company={company} platformName={title}>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>
