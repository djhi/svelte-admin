<script lang="ts">
    import Datagrid from "./carbon/Datagrid.svelte";
    import TextField from "./carbon/TextField.svelte";
    import List from "./core/List.svelte";    
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
