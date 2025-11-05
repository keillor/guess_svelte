<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { goto, replaceState } from '$app/navigation';
	import { page } from '$app/state';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let showCheckedOnly = $state<boolean>(false);

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});

		const url = new URL(window.location.href);
		table.getColumn('setName')?.setFilterValue(url.searchParams.get('search'));
		
</script>

<div class="md:w-2xl">
	<div class="flex flex-row flex-wrap items-center py-4">
		<Input
			placeholder="Filter within page..."
			value={table.getColumn('setName')?.getFilterValue() as string}
			onchange={(e) => {
				const url = new URL(window.location.href);
				url.searchParams.set('search', e.currentTarget.value);
				replaceState(url.toString(), history.state);
				//history.replaceState(history.state, '', url.toString());
				table.getColumn('setName')?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				const url = new URL(window.location.href);
				url.searchParams.set('search', e.currentTarget.value);
				history.replaceState(history.state, '', url.toString());
				table.getColumn('setName')?.setFilterValue(e.currentTarget.value);
			}}
			class="sm:max-w-sm"
		/>
		<Select.Root type="single" name="pageSize" value={pagination.pageSize} onValueChange={(value) => table.setPageSize(Number(value))}>
			<Select.Trigger class="w-full ml-auto sm:w-[14em] bg-white">
				Results per Page: {pagination.pageSize}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Filter Size</Select.Label>
					{#each [10,20,50] as num}
						<Select.Item
							value={num}
							label={num}
							disabled={num === pagination.pageSize}
							
						>
							{num}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
	<div class="w-full rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head colspan={header.colSpan}>
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							</Table.Head>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
<Pagination.Root count={data.length} perPage={pagination.pageSize}>
	{#snippet children({ pages, currentPage })}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton onclick={() => table.previousPage()} />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link
							{page}
							isActive={currentPage === page.value}
							onclick={() => table.setPageIndex(page.value - 1)}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton onclick={() => table.nextPage()} />
			</Pagination.Item>
		</Pagination.Content>
	{/snippet}
</Pagination.Root>

<div class="flex-1 text-sm text-muted-foreground">
	{table.getFilteredSelectedRowModel().rows.length} of{' '}
	{table.getFilteredRowModel().rows.length} row(s) selected.
</div>
