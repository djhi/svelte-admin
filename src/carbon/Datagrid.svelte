<script lang="ts">
    import { DataTable } from "carbon-components-svelte";
    import { Pagination } from "carbon-components-svelte";
    import { getContext, hasContext } from "svelte";
    import type { ListContext } from "../types";
    import DatagridCell from "./DatagridCell.svelte";
    export let context: ListContext;
    export let fields;

    const handlePaginationChange = ({ detail }) => {
        context.setPagination({ perPage: detail.pageSize, page: detail.page })
    };
</script>

{#if context}
<DataTable
    size="short"
    headers={fields.map(field => (
        { key: field, value: field }
    ))}
    rows={context.data}
>
    <DatagridCell slot="cell" let:row let:cell record={row}>
        <slot name="cell" source={cell.key}>{cell.value}</slot>
    </DatagridCell>
</DataTable>
<Pagination
    totalItems={context.total}
    pageSizes={[10, 25, 50]}
    page={context.pagination.page}
    pageSize={context.pagination.perPage}
    on:update={handlePaginationChange}
/>
{/if}
