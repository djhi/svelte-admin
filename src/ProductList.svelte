<script lang="ts">
    import Datagrid from "./carbon/Datagrid.svelte";
    import NumberField from "./carbon/NumberField.svelte";
    import TextField from "./carbon/TextField.svelte";
    import List from "./core/List.svelte";    
    import ReferenceField from "./core/ReferenceField.svelte";
</script>

<List>
    <Datagrid fields={[
        'reference',
        'category_id',
        'height',
        'width',
        'price',
    ]}>
        <svelte:fragment slot="cell" let:source>
            {#if source === 'reference'}
                <TextField source={source} />
            {:else if source === 'category_id'}
                <ReferenceField reference="categories" source={source} let:record>
                    <TextField source="name" record={record} />
                </ReferenceField>
            {:else}
                <NumberField source={source} />
            {/if}
        </svelte:fragment>
    </Datagrid>
</List>
