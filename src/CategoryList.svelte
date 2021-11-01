<script lang="ts">
    import { List } from "./core";
    import { Datagrid, TextField } from "./carbon";
</script>

<List>
    <Datagrid fields={[
        'name',
    ]}>
        <svelte:fragment slot="cell" let:source>
            <TextField source={source} />
        </svelte:fragment>
    </Datagrid>
</List>
