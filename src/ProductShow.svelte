<script lang="ts">
  import { Show, ReferenceField } from "./core";
  import { NumberField, TextField } from "./carbon";
</script>

<Show pageTitle={(record) => `Product #${record.reference}`}>
  <div class="container">
    <TextField source="reference" label="Reference" />
    <ReferenceField reference="categories" source="category_id">
      <TextField source="name" label="Category" />
    </ReferenceField>
    <div class="row">
      <NumberField source="height" label="Height" />
      <NumberField source="width" label="Width" />
      <NumberField source="price" label="Price" />
    </div>
  </div>
</Show>

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
