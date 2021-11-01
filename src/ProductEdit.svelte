<script lang="ts">
  import { Edit } from "./core";
  import { Form, NumberInput, TextInput } from "./carbon";
  import { FormGroup } from "carbon-components-svelte";
</script>

<Edit>
  <Form>
    <FormGroup>
      <TextInput source="reference" label="Reference" />
    </FormGroup>
    <FormGroup>
      <div class="row">
        <NumberInput source="height" label="Height" step="0.01" />
        <NumberInput source="width" label="Width" step="0.01" />
        <NumberInput source="price" label="Price" step="0.01" />
      </div>
    </FormGroup>
  </Form>
</Edit>

<style>
  .row {
    display: flex;
    gap: 24px;
  }
</style>
