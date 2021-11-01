<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import type { FormProps } from "./form";
  import { getResourceRecord } from "./resources";
  const save = getContext<(values: Record<string, any>) => void>("save");
  export let formProps: FormProps = {
    onSubmit: save,
  };

  const record = getResourceRecord();
  console.log({ save, formProps });
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
  export let form = formApi;
</script>

<slot />
