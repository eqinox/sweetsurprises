"use client";
import { useAuth } from "@/context/auth";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, Clock, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getReservationStatusLabel,
  Reservation,
  ReservationStatus,
} from "@/types/reservation";
import {
  approveReservation,
  approveReservations,
  cancelReservation,
  cancelReservations,
} from "@/actions/reservation-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  reservations: Reservation[];
}

export const dateTimeSortingFn: SortingFn<Reservation> = (rowA, rowB) => {
  const dateA = rowA.original.date;
  const dateB = rowB.original.date;
  const timeA = rowA.original.time;
  const timeB = rowB.original.time;

  if (!dateA || !dateB) return 0;

  const getDateTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate.getTime();
  };

  const a = getDateTime(dateA, timeA);
  const b = getDateTime(dateB, timeB);

  const result = a - b;

  return result;
};

export const getReservationColumns = (
  onRefresh: () => void
): ColumnDef<Reservation>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Услуга
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("service")}</div>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Име
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Имейл
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Телефон
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    id: "dateTime",
    accessorFn: (row) => {
      const [hours, minutes] = row.time.split(":").map(Number);
      const date = new Date(row.date);
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.getTime(); // numeric value used for sorting
    },
    sortingFn: dateTimeSortingFn, // optional, could also omit since value is numeric
    enableSorting: true,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!pl-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Дата и час
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date: Date | null = row.original.date;
      const time: string = row.original.time;

      const formattedDate = date
        ? date.toLocaleDateString("bg-BG", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "–";

      return (
        <div className="text-left font-medium">
          {formattedDate} {time}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status: ReservationStatus = row.getValue("status");
      console.log("status", status);
      return (
        <span className="flex items-center">
          {getReservationStatusLabel(status)}
          {status === 2 && (
            <Check
              className="bg-green-500 rounded ml-1"
              color="white"
              size={14}
            />
          )}

          {status === 1 && (
            <Clock
              className="bg-yellow-500 rounded ml-1"
              color="white"
              size={14}
            />
          )}

          {status === 3 && (
            <X className="bg-red-500 rounded ml-1" color="white" size={14} />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    cell: () => null,
  },
  {
    accessorKey: "time",
    cell: () => null,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response = await approveReservation(reservation.id);

                if (response?.error) {
                  toast.error("Грешка", {
                    description: response.message,
                  });
                } else if (response?.error === false) {
                  onRefresh();
                }
              }}
            >
              Потвърди
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const response = await cancelReservation(reservation.id);

                if (response?.error) {
                  toast.error("Грешка", {
                    description: response.message,
                  });
                } else if (response?.error === false) {
                  onRefresh();
                }
              }}
            >
              Откажи
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Reservations({ reservations }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "dateTime", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      date: false,
      time: false,
    });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<Reservation>({
    data: reservations,
    columns: getReservationColumns(() => router.refresh()),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const lowerFilter = filterValue.toLowerCase();
      return (
        row.original.name?.toLowerCase().includes(lowerFilter) ||
        row.original.email?.toLowerCase().includes(lowerFilter) ||
        row.original.phone?.toLowerCase().includes(lowerFilter)
      );
    },
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (!auth?.customClaims?.admin) {
    return <div>not found</div>;
  }

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);
  const hasSelected = table.getSelectedRowModel().rows.length > 0;

  return (
    <div className="w-full bg-pink-200/80 rounded">
      <div className="flex items-center py-4">
        <Input
          placeholder="Търси по име, имейл или телефон..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-left">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={getReservationColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Buttons */}
      <div className="mt-1">
        <Button
          variant="success"
          disabled={!hasSelected}
          onClick={async () => {
            let response;
            if (selectedIds.length === 1) {
              response = await approveReservation(selectedIds[0]);
            } else if (selectedIds.length > 1) {
              response = await approveReservations(selectedIds);
            } else {
              toast.error("Моля изберете резервация");
            }

            if (response?.error) {
              toast.error("Грешка", {
                description: response.message,
              });
            } else if (response?.error === false) {
              router.refresh();
              table.resetRowSelection();
            }
          }}
        >
          <Check size={16} />
          Потвърди
        </Button>
        <Button
          variant="destructive"
          disabled={!hasSelected}
          onClick={async () => {
            let response;
            if (selectedIds.length === 1) {
              response = await cancelReservation(selectedIds[0]);
            } else if (selectedIds.length > 1) {
              response = await cancelReservations(selectedIds);
            } else {
              toast.error("Моля изберете резервация");
            }

            if (response?.error) {
              toast.error("Грешка", {
                description: response.message,
              });
            } else if (response?.error === false) {
              router.refresh();
              table.resetRowSelection();
            }
          }}
        >
          <X />
          Откажи
        </Button>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
