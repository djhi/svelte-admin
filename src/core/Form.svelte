<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import type { FormProps } from "./form";
  import { getResourceRecord } from "./resources";
  export let formProps: FormProps = undefined;

  const record = getResourceRecord();
  const formApi = createForm({
    ...formProps,
    initialValues: $record || formProps.initialValues,
  });

  $: {
    if ($record) {
      formApi.updateInitialValues($record);
    }
  }

  setContext("form", formApi);
</script>

<form on:submit={formApi.handleSubmit}>
  <slot />
</form>
