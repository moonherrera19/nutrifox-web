"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  TableInstance,
} from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/table-core";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    fechaVisita: new Date(),
    comentario: "Ejemplo de comentario",
    estudianteId: "123",
    completado: true,
    idVisita: "visita-1",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    fechaVisita: new Date(),
    comentario: "Otro comentario",
    estudianteId: "456",
    completado: false,
    idVisita: "visita-2",
  },
  // ... más datos con los nuevos campos
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  fechaVisita: Date;
  comentario: string;
  estudianteId: string;
  completado: boolean;
  idVisita: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "idVisita",
    header: "ID Visita",
  },
  {
    accessorKey: "estudianteId",
    header: "ID Estudiante",
  },
  {
    accessorKey: "completado",
    header: "Completado",
    cell: ({ row }) => {
      const completado = row.getValue("completado");

      // Función para actualizar el estado en el backend y la tabla (recibe 'table' como argumento)
      const toggleCompletado = async (table: TableInstance<Payment>) => {
        try {
          // 1. Actualizar el estado en tu backend
          const response = await fetch(`/api/visitas/${row.original.id}`, {
            // Reemplaza con la URL correcta de tu API
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completado: !completado }),
          });

          if (!response.ok) {
            throw new Error("Error al actualizar el estado en el backend");
          }

          // 2. Actualizar la data en la tabla (opcional, si la API no retorna la data actualizada)
          const newData = [...table.options.data];
          const rowIndex = newData.findIndex(
            (item) => item.id === row.original.id
          );
          newData[rowIndex].completado = !completado;
          table.setData(newData);
        } catch (error) {
          console.error(error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      };

      return (
        <Button
          variant={completado ? "default" : "outline"}
          onClick={() => toggleCompletado(table)} // Pasar 'table' a la función
        >
          {completado ? "Completado" : "Marcar como completado"}
        </Button>
      );
    },
  },

  {
    accessorKey: "comentario",
    header: "Comentario",
  },
  {
    accessorKey: "fechaVisita",
    header: "Fecha de Visita",
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("fechaVisita"));
      const opciones: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return fecha.toLocaleDateString("es-ES", opciones);
    },
  },
];

export function DataTableProgramaciones() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
