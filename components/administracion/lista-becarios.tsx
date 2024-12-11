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

interface Convocatoria {
  idConvocatoria: string;
  numeroControl: string;
  nombre: string;
}

export function TableBecarios() {
  const [convocatorias] = useState<Convocatoria[]>([
    {
      idConvocatoria: "CONV001",
      numeroControl: "12345",
      nombre: "Convocatoria de Becas 2024",
    },
    {
      idConvocatoria: "CONV002",
      numeroControl: "67890",
      nombre: "Convocatoria de Apoyo a la Investigación",
    },
    // ... más convocatorias
  ]);

  return (
    <Table>
      <TableCaption>Lista de Becarios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID Convocatoria</TableHead>
          <TableHead>Número de Control</TableHead>
          <TableHead>Nombre</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {convocatorias.map((convocatoria: Convocatoria) => (
          <TableRow key={convocatoria.idConvocatoria}>
            <TableCell>{convocatoria.idConvocatoria}</TableCell>
            <TableCell>{convocatoria.numeroControl}</TableCell>
            <TableCell>{convocatoria.nombre}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}