<script lang="ts">
  import { ComboBox, SelectSkeleton } from "carbon-components-svelte";
  import { getContext } from "svelte";
  import { derived, get, writable } from "svelte/store";
  import lodashGet from "lodash/get";
  import {
    getForm,
    getIsLoading,
    ReferenceInputContext,
  } from "@svelte-admin/core";

  export let source;
  export let optionValue = "id";
  export let optionText = "name";
  export let choices: { id: string; text: string }[] = [];
  export let label = undefined;

  const finalChoices = writable(choices);
  const { form, handleChange } = getForm();
  const isLoading = getIsLoading();
  const { source: referenceSource, ...context } =
    getContext<ReferenceInputContext>("reference");

  if (context && get(context)?.data?.data) {
    finalChoices.set(
      get(context).data.data.map((record) => ({
        id: lodashGet(record, optionValue).toString(),
        text: lodashGet(record, optionText).toString(),
        choice: record,
      }))
    );
  }

  $: {
    if ($context.data) {
      finalChoices.set(
        $context.data.data.map((record) => ({
          id: lodashGet(record, optionValue).toString(),
          text: lodashGet(record, optionText).toString(),
          choice: record,
        }))
      );
    }
  }

  const selectedValue = derived(form, ($form) =>
    $form[referenceSource ?? source]?.toString()
  );

  let selectedIndex;
  $: {
    if ($finalChoices && $selectedValue) {
      selectedIndex = $finalChoices.findIndex(
        (choice) => choice.id === $selectedValue
      );
    }
  }
  let input: HTMLInputElement;
  const handleKeyUp = () => {
    context.setFilter({ q: input.value });
  };

  const handleClear = () => {
    context.setFilter({ q: "" });
  };

  let value = $form[referenceSource ?? source];
  const handleSelect = (event) => {
    value = lodashGet(event.detail.selectedItem.choice, optionValue);
    // @ts-ignore
    handleChange({ target: { name: referenceSource ?? source, value } });
  };
</script>

{#if $isLoading}
  <SelectSkeleton {...$$restProps} />
{:else}
  <ComboBox
    titleText={label}
    {selectedIndex}
    items={$finalChoices}
    on:keyup={handleKeyUp}
    on:clear={handleClear}
    on:select={handleSelect}
    bind:ref={input}
    {...$$restProps}
  />
  <input type="hidden" name={referenceSource ?? source} {value} />
{/if}
