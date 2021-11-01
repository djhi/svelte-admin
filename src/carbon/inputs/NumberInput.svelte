<script lang="ts">
  import { TextInput, TextInputSkeleton } from "carbon-components-svelte";
  import { getDataLoadingState, getForm } from "../../core";

  export let source;
  export let label = undefined;
  const dataLoadingContext = getDataLoadingState();
  const { form, handleChange } = getForm();
</script>

{#if $dataLoadingContext.status === "loading"}
  <TextInputSkeleton {...$$restProps} />
{:else}
  <TextInput
    name={source}
    labelText={label}
    type="number"
    bind:value={$form[source]}
    on:input={handleChange}
    {...$$restProps}
  />
{/if}
