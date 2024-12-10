"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



export interface EstudianteProps {
  nombre: string;
  apellido: string;
  numeroControl: string;
  grado: string;
  grupo: string;
}

export function EstudianteCard({
  nombre,
  apellido,
  numeroControl,
  grado,
  grupo,
}: EstudianteProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Credencial Nutrifox</CardTitle>
        <CardDescription>
          {nombre} {apellido}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>No. Control: {numeroControl}</li>
          <li>Grado: {grado}</li>
          <li>Grupo: {grupo}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}