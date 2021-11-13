<script lang="ts">
  import {
    Edit,
    getResource,
    ReferenceInput,
    ResourceRecord,
    SuccessSideEffectsFunction,
  } from "@svelte-admin/core";
  import {
    Form,
    NumberInput,
    AutocompleteInput,
    TextInput,
  } from "@svelte-admin/carbon";
  import { FormGroup } from "carbon-components-svelte";

  const { name: resource } = getResource();
  const handleSuccess: SuccessSideEffectsFunction<ResourceRecord> = (
    data,
    effects
  ) => {
    effects.redirect("list", resource);
    effects.notify(`Successfully updated ${data.reference}`);
  };
</script>

<Edit onSuccess={handleSuccess}>
  <Form>
    <FormGroup>
      <TextInput source="reference" label="Reference" />
    </FormGroup>
    <FormGroup>
      <ReferenceInput
        source="category_id"
        reference="categories"
        pagination={{ perPage: 50, page: 1 }}
      >
        <AutocompleteInput source="name" label="Category" />
      </ReferenceInput>
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
