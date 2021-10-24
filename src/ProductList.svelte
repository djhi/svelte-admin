<script lang="ts">
  import { List, ReferenceField } from "./core";
  import { Datagrid, NumberField, ShowButton, TextField } from "./carbon";
</script>

<List>
  <Datagrid
    fields={["reference", "category_id", "height", "width", "price", ""]}
  >
    <svelte:fragment slot="cell" let:source>
      {#if source === "reference"}
        <TextField {source} />
      {:else if source === "category_id"}
        <ReferenceField reference="categories" {source} let:record>
          <TextField source="name" {record} />
        </ReferenceField>
      {:else if ["height", "width", "price"].includes(source)}
        <NumberField {source} />
      {:else}
        <ShowButton />
      {/if}
    </svelte:fragment>
  </Datagrid>
</List>
