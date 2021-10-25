<script lang="ts">
  import { Edit } from "./core";
  import { Form, NumberInput, TextInput } from "./carbon";
  import { Button, TextInputSkeleton } from "carbon-components-svelte";
  let save;
</script>

<Edit bind:save>
  <Form formProps={{ onSubmit: save }}>
    <div class="container">
      <TextInput source="reference" label="Reference" />
      <div class="row">
        <NumberInput source="height" label="Height" step="0.01" />
        <NumberInput source="width" label="Width" step="0.01" />
        <NumberInput source="price" label="Price" step="0.01" />
      </div>
    </div>
  </Form>
</Edit>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .row {
    display: flex;
    gap: 24px;
  }
</style>
