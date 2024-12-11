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

interface Cuestionario {
  idCuestionario: string;
  numeroControl: string;
  calificacion: number;
  estatus: "Becario" | "Solicitante";
}

export function TableDocuentacion() {
  const [cuestionarios] = useState<Cuestionario[]>([
    {
      idCuestionario: "CUEST001",
      numeroControl: "12345",
      calificacion: 85,
      estatus: "Becario",
    },
    {
      idCuestionario: "CUEST002",
      numeroControl: "67890",
      calificacion: 92,
      estatus: "Solicitante",
    },
    // ... más cuestionarios
  ]);

  return (
    <Table>
      <TableCaption>Lista de Documentacion.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID Cuestionario</TableHead>
          <TableHead>Número de Control</TableHead>
          <TableHead>Calificación</TableHead>
          <TableHead>Estatus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cuestionarios.map((cuestionario: Cuestionario) => (
          <TableRow key={cuestionario.idCuestionario}>
            <TableCell>{cuestionario.idCuestionario}</TableCell>
            <TableCell>{cuestionario.numeroControl}</TableCell>
            <TableCell>{cuestionario.calificacion}</TableCell>
            <TableCell>{cuestionario.estatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}