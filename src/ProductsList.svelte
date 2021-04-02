<script lang="ts">
    import Datagrid from "./carbon/Datagrid.svelte";
    import List from "./core/List.svelte";    
</script>

<List let:context={context}>
    <Datagrid context={context} />
</List>
