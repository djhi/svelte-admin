<script lang="ts">
  import { List } from "./core";
  import { Datagrid, TextField } from "./carbon";
</script>

<List>
  <Datagrid disableActions fields={["name"]}>
    <svelte:fragment slot="cell" let:source>
      <TextField {source} />
    </svelte:fragment>
  </Datagrid>
</List>
