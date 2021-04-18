<script lang="ts">
    const sorting = {
        "ascending": "ASC",
        "descending": "DESC",
    }
    import { DataTable } from "carbon-components-svelte";
    import { Pagination } from "carbon-components-svelte";
    import { humanize } from 'inflection';

    import type { ListContext } from "../types";
    import DatagridCell from "./DatagridCell.svelte";
    export let context: ListContext;
    export let fields;

    const handlePaginationChange = ({ detail }) => {
        context.setPagination({ perPage: detail.pageSize, page: detail.page })
    };

    const handleHeaderClick = ({ detail }) => {
        context.setSort({ field: detail.header.key, order: sorting[detail.sortDirection] });
    }
</script>

{#if context}
<DataTable
    size="short"
    sortable
    headers={fields.map(field => (
        { key: field, value: field }
    ))}
    rows={context.data}
    on:click:header={handleHeaderClick}
>
    <svelte:fragment slot="cell-header" let:header>
        <slot name="cell-header" source={header.key}>
            {humanize(header.key)}
        </slot>
    </svelte:fragment>
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
