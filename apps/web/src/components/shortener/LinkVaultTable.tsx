import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type LinkVaultRow = {
	originalUrl: string;
	shortLink: string;
};

const seedRows: LinkVaultRow[] = [
	{
		originalUrl: "https://github.com/developer/project-alpha-secure-vault-v2",
		shortLink: "shrt.c/zP8kL",
	},
	{
		originalUrl:
			"https://figma.com/file/AS928JkL1029AsjkL99/Short-Circuit-UI-Kit-Final",
		shortLink: "shrt.c/F9gX2",
	},
	{
		originalUrl:
			"https://docs.google.com/spreadsheets/d/1vA89s_k8L01_JkL-2024-report",
		shortLink: "shrt.c/R1pY9",
	},
	{
		originalUrl:
			"https://aws.console.amazon.com/lambda/home/functions/zap-shorter-prod",
		shortLink: "shrt.c/L5mZ4",
	},
];

export default function LinkVaultTable() {
	const [data, setData] = useState(seedRows);

	const columns = useMemo<ColumnDef<LinkVaultRow>[]>(
		() => [
			{
				accessorKey: "originalUrl",
				header: "ORIGINAL URL",
				cell: ({ row }) => (
					<span className="block max-w-[240px] truncate text-on-background/70">
						{row.original.originalUrl}
					</span>
				),
			},
			{
				accessorKey: "shortLink",
				header: "SHORT LINK",
				cell: ({ row }) => (
					<span className="font-bold text-electric-cyan">
						{row.original.shortLink}
					</span>
				),
			},
			{
				id: "actions",
				header: () => <span className="block text-right">ACTIONS</span>,
				cell: ({ row }) => (
					<div className="flex justify-end gap-2">
						<Button
							className="size-8 rounded-none border border-border-subtle bg-transparent text-muted-gray hover:bg-electric-cyan/10 hover:text-electric-cyan"
							onClick={() => {
								void navigator.clipboard.writeText(row.original.shortLink);
							}}
							size="icon"
							type="button"
							variant="ghost"
						>
							<span className="material-symbols-outlined text-base">
								content_copy
							</span>
						</Button>
						<Button
							className="size-8 rounded-none border border-border-subtle bg-transparent text-muted-gray hover:bg-red-500/10 hover:text-electric-red"
							onClick={() => {
								setData((current) =>
									current.filter(
										(item) => item.shortLink !== row.original.shortLink,
									),
								);
							}}
							size="icon"
							type="button"
							variant="ghost"
						>
							<span className="material-symbols-outlined text-base">
								delete_forever
							</span>
						</Button>
					</div>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 4,
			},
		},
	});

	const totalPages = 24;
	const currentPage = table.getState().pagination.pageIndex + 1;

	return (
		<div className="border border-border-subtle bg-surface">
			<Table>
				<TableHeader className="border-b border-border-subtle bg-surface-elevated">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							className="border-border-subtle hover:bg-surface-elevated"
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<TableHead
									className="px-6 py-4 font-code-accent text-xs tracking-[0.2em] text-muted-gray uppercase"
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="divide-y divide-border-subtle font-code-accent">
					{table.getRowModel().rows.map((row) => (
						<TableRow
							className="border-border-subtle hover:bg-[#1A1A24]"
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="px-6 py-4" key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between border-t border-border-subtle bg-surface-elevated px-6 py-3">
				<span className="font-code-accent text-[10px] tracking-[0.2em] text-muted-gray uppercase">
					PAGE {String(currentPage).padStart(2, "0")} OF {totalPages}
				</span>
				<div className="flex gap-2">
					<Button
						className="rounded-none px-3 font-heading text-xs tracking-[0.2em] uppercase"
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
						type="button"
						variant="ghost"
					>
						PREV
					</Button>
					<Button
						className="rounded-none px-3 font-heading text-xs tracking-[0.2em] text-electric-cyan uppercase"
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
						type="button"
						variant="ghost"
					>
						NEXT
					</Button>
				</div>
			</div>
		</div>
	);
}
