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

interface Becario {
  numeroControl: string;
  idCuestionario: string;
  calificacion: number;
  esBecario: boolean;
}

export function SolicitantesListaDocuentacion() {
  const [becarios] = useState<Becario[]>([
    {
      numeroControl: "12345",
      idCuestionario: "CUEST001",
      calificacion: 85,
      esBecario: true,
    },
    {
      numeroControl: "67890",
      idCuestionario: "CUEST002",
      calificacion: 92,
      esBecario: false,
    },
    // ... más becarios
  ]);

  return (
    <Table>
      <TableCaption>Lista de solicitantes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Número de Control</TableHead>
          <TableHead>ID Cuestionario</TableHead>
          <TableHead>Calificación</TableHead>
          <TableHead>Es Becario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {becarios.map((becario: Becario) => (
          <TableRow key={becario.numeroControl}>
            <TableCell>{becario.numeroControl}</TableCell>
            <TableCell>{becario.idCuestionario}</TableCell>
            <TableCell>{becario.calificacion}</TableCell>
            <TableCell>{becario.esBecario ? "Sí" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}