<script lang="ts">
    import Datagrid from "./carbon/Datagrid.svelte";
    import NumberField from "./carbon/NumberField.svelte";
    import TextField from "./carbon/TextField.svelte";
    import List from "./core/List.svelte";    
</script>

<List let:context={context}>
    <Datagrid context={context} fields={[
        'reference',
        'height',
        'width',
        'price',
    ]}>
        <svelte:fragment slot="cell" let:source>
            {#if source === 'reference'}
                <TextField source={source} />
            {:else}
                <NumberField source={source} />
            {/if}
        </svelte:fragment>
    </Datagrid>
</List>
