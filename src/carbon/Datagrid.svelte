<script lang="ts">
  const sorting = {
    ascending: "ASC",
    descending: "DESC",
  };
  import { DataTable } from "carbon-components-svelte";
  import { Pagination } from "carbon-components-svelte";
  import { humanize } from "inflection";
  import { getContext } from "svelte";
  import type { UseGetListResult } from "../core";
  import DatagridCell from "./DatagridCell.svelte";
  export let fields;

  const context = getContext<UseGetListResult>("list");

  const handlePaginationChange = (options) => {
    console.log({ options });
    const { detail } = options;
    if (!detail || detail.pageSize == undefined || detail.page == undefined) {
      return;
    }
    context.setPagination({ perPage: detail.pageSize, page: detail.page });
  };

  const handleHeaderClick = ({ detail }) => {
    context.setSort({
      field: detail.header.key,
      order: sorting[detail.sortDirection],
    });
  };
</script>

<DataTable
  size="short"
  sortable
  headers={fields.map((field) => ({ key: field, value: field }))}
  rows={$context?.data?.data ?? []}
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
  totalItems={$context?.data?.total}
  pageSizes={[10, 25, 50]}
  page={$context?.data?.pagination?.page}
  pageSize={$context?.data?.pagination?.perPage}
  on:update={handlePaginationChange}
/>
