"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import Container from "@/components/ui/container";

const data: User[] = [
  {
    id: "mnop",
    SN: 1,
    UserName: "nabin",
    email: "ken99@yahoo.com",
    role: "admin",
  },
  {
    id: "oprs",
    SN: 2,
    UserName: "Roshan",
    email: "Abe45@gmail.com",
    role: "seller",
  },
];

export type User = {
  SN: number;
  UserName: string;
  id: string;
  email: string;
  role: "customer" | "seller" | "admin";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "SN",
    header: "SN",
    cell: ({ row }) => <div className="capitalize">{row.getValue("SN")}</div>,
  },

  {
    accessorKey: "UserName",
    header: "UserName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("UserName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const User = row.original;

      // Function to delete a user
      async function deleteUser(userId: string) {
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/v1/${userId}`,
              {
                method: "DELETE",
              }
            );
            const data = await response.json();
            if (data.success) {
              alert("User deleted successfully!");
              // Optionally refresh the data table
            } else {
              alert(`Failed to delete user: ${data.message}`);
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
          }
        }
      }

      // Function to suspend a user
      async function suspendUser(userId: string) {
        if (confirm("Are you sure you want to suspend this user?")) {
          try {
            const response = await fetch(`/api/users/${userId}/suspend`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ suspended: true }),
            });
            const data = await response.json();
            if (data.success) {
              alert("User suspended successfully!");
              // Optionally refresh the data table
            } else {
              alert(`Failed to suspend user: ${data.message}`);
            }
          } catch (error) {
            console.error("Error suspending user:", error);
            alert("An error occurred while suspending the user.");
          }
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(User.id)}
            ></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                deleteUser("roshan");
              }}
            >
              Delete User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                suspendUser("pawan");
              }}
            >
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,

      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Container className="rounded-md border ">
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
          <TableBody>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}
