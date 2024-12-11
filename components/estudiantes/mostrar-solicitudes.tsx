"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    idSolicitud: 5,
    estatus: "Pendiente",
    cuestionarios: [
      {
        idCuestionario: 5,
        kardex: {
          type: "Buffer",
          data: [],
        },
        cartaMotivos: {
          type: "Buffer",
          data: [],
        },
        respuestas: [
          {
            idRespuesta: 9,
            respuesta: "Excelente",
            pregunta: {
              idPregunta: 2,
              titulo: "Pregunta prueba 2",
            },
          },
          {
            idRespuesta: 8,
            respuesta: "Excelente",
            pregunta: {
              idPregunta: 1,
              titulo: "Pregunta de ejemplo",
            },
          },
        ],
      },
    ],
  },
];

export type Solicitud = {
  idSolicitud: number;
  estatus: string;
  cuestionarios: Cuestionario[];
};

export type Cuestionario = {
  idCuestionario: number;
  kardex: { type: string; data: any[] };
  cartaMotivos: { type: string; data: any[] };
  respuestas: Respuesta[];
};

export type Respuesta = {
  idRespuesta: number;
  respuesta: string;
  pregunta: { idPregunta: number; titulo: string };
};

const columns: ColumnDef<Solicitud>[] = [
  {
    accessorKey: "idSolicitud",
    header: "ID Solicitud",
  },
  {
    accessorKey: "estatus",
    header: "Estatus",
  },
  {
    accessorKey: "cuestionarios",
    header: "Cuestionarios",
    cell: ({ row }) => {
      const cuestionarios = row.getValue("cuestionarios") as Cuestionario[];
      return (
        <div>
          {cuestionarios.map((cuestionario) => (
            <div key={cuestionario.idCuestionario} className="mb-4">
              <strong>ID Cuestionario:</strong> {cuestionario.idCuestionario}
              <br />
              <strong>Respuestas:</strong>
              <ul>
                {cuestionario.respuestas.map((respuesta) => (
                  <li key={respuesta.idRespuesta}>
                    {respuesta.pregunta.titulo}: {respuesta.respuesta}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    },
  },
];

export function DataTableSolicitudes() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
    </div>
  );
}
