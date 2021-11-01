<script lang="ts">
  import { List, ReferenceField } from "./core";
  import {
    Datagrid,
    EditButton,
    NumberField,
    ShowButton,
    TextField,
  } from "./carbon";
</script>

<List sort={{ field: "reference", order: "ASC" }}>
  <Datagrid fields={["reference", "category_id", "height", "width", "price"]}>
    <svelte:fragment slot="cell" let:source>
      {#if source === "reference"}
        <TextField {source} />
      {:else if source === "category_id"}
        <ReferenceField reference="categories" {source}>
          <TextField source="name" />
        </ReferenceField>
      {:else if ["height", "width", "price"].includes(source)}
        <NumberField {source} />
      {/if}

      {#if source === "@@actions"}
        <EditButton />
        <ShowButton />
      {/if}
    </svelte:fragment>
  </Datagrid>
</List>
