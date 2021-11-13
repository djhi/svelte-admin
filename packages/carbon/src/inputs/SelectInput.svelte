<script lang="ts">
  import { Select, SelectItem, SelectSkeleton } from "carbon-components-svelte";
  import { getContext } from "svelte";
  import { derived, get, writable } from "svelte/store";
  import lodashGet from "lodash/get";
  import {
    getForm,
    getIsLoading,
    ReferenceInputContext,
    ResourceRecord,
  } from "@svelte-admin/core";

  export let source;
  export let optionValue = "id";
  export let optionText = "name";
  export let choices: ResourceRecord[] = [];
  export let label = undefined;

  const finalChoices = writable(choices);
  const { form, handleChange } = getForm();
  const isLoading = getIsLoading();
  const { source: referenceSource, ...context } =
    getContext<ReferenceInputContext>("reference");

  if (context && get(context)?.data?.data) {
    finalChoices.set(get(context).data.data);
  }

  const selected = derived(form, ($form) =>
    $form[referenceSource ?? source]?.toString()
  );
  $: {
    if ($context.data) {
      finalChoices.set($context.data.data);
    }
  }
</script>

{#if $isLoading}
  <SelectSkeleton {...$$restProps} />
{:else}
  <Select
    name={referenceSource ?? source}
    labelText={label}
    selected={$selected}
    on:input={handleChange}
    {...$$restProps}
  >
    {#each $finalChoices as choice (choice.id)}
      <SelectItem
        value={lodashGet(choice, optionValue).toString()}
        text={lodashGet(choice, optionText)}
      />
    {/each}
  </Select>
{/if}
