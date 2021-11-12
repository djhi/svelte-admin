<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import merge from "lodash/merge";
  import type { FormProps } from "./form";
  import { getResourceRecord } from "./resources";
  import { get } from "svelte/store";
  const save = getContext<(values: Record<string, any>) => void>("save");
  export let formProps: FormProps = {
    onSubmit: save,
  };

  const record = getResourceRecord();
  const formApi = createForm({
    ...formProps,
    initialValues: $record || formProps.initialValues,
  });

  $: {
    if ($record) {
      const initialValues = merge($record, get(formApi.form));
      formApi.updateInitialValues(initialValues);
    }
  }

  setContext("form", formApi);
  export const form = formApi;
</script>

<slot />
