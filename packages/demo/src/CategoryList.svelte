<script lang="ts">
  import { Datagrid, List, TextField } from "@svelte-admin/carbon";
</script>

<List>
  <Datagrid disableActions fields={["name"]}>
    <svelte:fragment slot="cell" let:source>
      <TextField {source} />
    </svelte:fragment>
  </Datagrid>
</List>
