<script lang="ts">
  const sorting = {
    ascending: "ASC",
    descending: "DESC",
  };
  import { DataTable } from "carbon-components-svelte";
  import { Pagination } from "carbon-components-svelte";
  import { humanize } from "inflection";
  import { getContext } from "svelte";
  import type { UseGetListResult } from "@svelte-admin/core";
  import DatagridCell from "./DatagridCell.svelte";
  export let fields;
  export let disableActions = false;

  const context = getContext<UseGetListResult>("list");

  const handlePaginationChange = (options) => {
    const { detail } = options;
    if (
      !detail ||
      detail.pageSize == undefined ||
      detail.page == undefined ||
      isNaN(detail.pageSize) ||
      isNaN(detail.page)
    ) {
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
  size="compact"
  sortable
  headers={fields
    .map((field) => ({
      key: field,
      value: field,
    }))
    .concat(
      disableActions ? [] : { key: "@@actions", value: "Actions", empty: true }
    )}
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
  page={$context?.pagination?.page}
  pageSize={$context?.pagination?.perPage}
  on:update={handlePaginationChange}
/>
