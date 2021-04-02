<script lang="ts">
    import { DataTable } from "carbon-components-svelte";
    import { Pagination } from "carbon-components-svelte";
    import { getContext, hasContext } from "svelte";
    import type { ListContext } from "../types";
    export let context: ListContext;

    const handlePaginationChange = ({ detail }) => {
        context.setPagination({ perPage: detail.pageSize, page: detail.page })
    };
</script>

{#if context}
<DataTable
    size="short"
    headers={[
        { key: 'reference', value: 'Reference' },
        { key: 'height', value: 'Height' },
        { key: 'width', value: 'Width' },
        { key: 'price', value: 'Price' },
    ]}
    rows={context.data}
/>
<Pagination
    totalItems={context.total}
    pageSizes={[10, 25, 50]}
    page={context.pagination.page}
    pageSize={context.pagination.perPage}
    on:update={handlePaginationChange}
/>
{/if}
