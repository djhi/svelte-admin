<script lang="ts">
  import { Form as Carbonform } from "carbon-components-svelte";
  import type { FormApi, FormProps } from "@svelte-admin/core";
  import { Form } from "@svelte-admin/core";
  import SaveButton from "./SaveButton.svelte";
  export let formProps: FormProps = undefined;
  let form: FormApi;
</script>

<Form {formProps} bind:form>
  <Carbonform on:submit={form.handleSubmit}>
    <slot />
    <slot name="toolbar">
      <SaveButton />
    </slot>
  </Carbonform>
</Form>
