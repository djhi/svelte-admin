<script lang="ts">
  import { TextInput, TextInputSkeleton } from "carbon-components-svelte";
  import { getForm, getIsLoading } from "../../core";

  export let source;
  export let label = undefined;
  const { form, handleChange } = getForm();
  const isLoading = getIsLoading();
</script>

{#if $isLoading}
  <TextInputSkeleton {...$$restProps} />
{:else}
  <TextInput
    labelText={label}
    bind:value={$form[source]}
    on:input={handleChange}
    {...$$restProps}
  />
{/if}
