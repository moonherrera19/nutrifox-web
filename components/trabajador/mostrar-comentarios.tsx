// mostrar-comentarios.tsx

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Comentario {
  idComentario: string;
  idProgramacion: string;
  numeroControl: string;
  comentario: string;
}

export function TableComentarios() {
  const [comentarios] = useState<Comentario[]>([ // Eliminar setComentarios
    {
      idComentario: "COM001",
      idProgramacion: "PROG001",
      numeroControl: "12345",
      comentario: "Ejemplo de comentario",
    },
    {
      idComentario: "COM002",
      idProgramacion: "PROG002",
      numeroControl: "67890",
      comentario: "Otro comentario",
    },
    // ... más comentarios
  ]);

  return (
    <Table>
      <TableCaption>Lista de comentarios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID Comentario</TableHead>
          <TableHead>ID Programación</TableHead>
          <TableHead>Número de Control</TableHead>
          <TableHead>Comentario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comentarios.map((comentario: Comentario) => (
          <TableRow key={comentario.idComentario}>
            <TableCell>{comentario.idComentario}</TableCell>
            <TableCell>{comentario.idProgramacion}</TableCell>
            <TableCell>{comentario.numeroControl}</TableCell>
            <TableCell>{comentario.comentario}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}