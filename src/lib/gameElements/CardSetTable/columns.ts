import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableAction from './data-table-action.svelte';
import { Checkbox } from '$lib/components/ui/checkbox';
import type { CharacterSet } from '$lib/models/CharacterSet.svelte';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

/*  characters: Character[];
    setName: string;
    userId: string | undefined;
    docId: string | undefined;
    submitted: string | number; */

export const columns: ColumnDef<CharacterSet>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'setName',
		header: 'Set Name'
	},
	{
		accessorKey: 'userId',
		header: 'User ID'
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableAction, { id: row.original.docId });
		}
	}
];
