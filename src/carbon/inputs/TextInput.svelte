<script lang="ts">
  import { TextInput, TextInputSkeleton } from "carbon-components-svelte";
  import { getForm } from "../../core";
  import { getDataLoadingState } from "../../core";

  export let source;
  export let label = undefined;
  const dataLoadingContext = getDataLoadingState();
  const { form, handleChange } = getForm();
</script>

{#if $dataLoadingContext.status === "loading"}
  <TextInputSkeleton {...$$restProps} />
{:else}
  <TextInput
    labelText={label}
    bind:value={$form[source]}
    on:input={handleChange}
    {...$$restProps}
  />
{/if}
