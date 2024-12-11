
"use client";
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Solicitud {
  idSolicitud: string;
  idConvocatoria: string;
  idEstudiante: string;
  calificacion: number;
  esBecario: boolean;
}


export function TableSolicitantes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      idSolicitud: "SOL001",
      idConvocatoria: "CONV001",
      idEstudiante: "EST001",
      calificacion: 85,
      esBecario: true,
    },
    {
      idSolicitud: "SOL002",
      idConvocatoria: "CONV002",
      idEstudiante: "EST002",
      calificacion: 92,
      esBecario: false,
    },
    // ... más solicitudes
  ]);

  // Función para actualizar el estado de 'esBecario' (recuerda implementar la lógica en tu backend)
  const toggleBecario = async (solicitud: Solicitud) => {
    try {
      const response = await fetch(`/api/solicitudes/${solicitud.idSolicitud}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ esBecario: !solicitud.esBecario }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado en el backend");
      }

      // Actualizar la data localmente 
      const updatedSolicitudes = solicitudes.map((s) =>
        s.idSolicitud === solicitud.idSolicitud ? { ...s, esBecario: !s.esBecario } : s
      );

      // Actualizar el estado del array 'solicitudes'
      setSolicitudes(updatedSolicitudes);

    } catch (error) {
      console.error(error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };


  return (
    <Table>
      <TableCaption>Lista de solicitudes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID Solicitud</TableHead>
          <TableHead>ID Convocatoria</TableHead>
          <TableHead>ID Estudiante</TableHead>
          <TableHead>Calificación</TableHead>
          <TableHead>Becario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {solicitudes.map((solicitud) => (
          <TableRow key={solicitud.idSolicitud}>
            <TableCell>{solicitud.idSolicitud}</TableCell>
            <TableCell>{solicitud.idConvocatoria}</TableCell>
            <TableCell>{solicitud.idEstudiante}</TableCell>
            <TableCell>{solicitud.calificacion}</TableCell>
            <TableCell>
              <Button 
                variant={solicitud.esBecario ? "default" : "outline"} 
                onClick={() => toggleBecario(solicitud)}
              >
                {solicitud.esBecario ? "Sí" : "No"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}