<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import { Button } from "carbon-components-svelte";
  import type { FormProps } from "../core";
  import { Form } from "../core";
  export let formProps: FormProps = undefined;
</script>

<Form {formProps}>
  <slot />
  <slot name="toolbar">
    <Button type="submit" size="small">Submit</Button>
  </slot>
</Form>
