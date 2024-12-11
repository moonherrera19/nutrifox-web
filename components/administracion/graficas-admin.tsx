"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartDataDia = [
  { tipo: "Sí", valor: 60, fill: "var(--color-green-500)" },
  { tipo: "No", valor: 40, fill: "var(--color-red-500)" },
];

const chartDataSemana = [
  { tipo: "Sí", valor: 75, fill: "var(--color-green-500)" },
  { tipo: "No", valor: 25, fill: "var(--color-red-500)" },
];

const chartDataMes = [
  { tipo: "Sí", valor: 80, fill: "var(--color-green-500)" },
  { tipo: "No", valor: 20, fill: "var(--color-red-500)" },
];

export function GraficasComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráficas de Becas</CardTitle>
        <CardDescription>
          Información sobre becas del día, semana y mes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="grid grid-cols-3 gap-4">
          {/* Gráfica del día */}
          <PieChart width={300} height={300}>
            <Pie
              data={chartDataDia}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
            >
              {chartDataDia.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Gráfica de la semana */}
          <PieChart width={300} height={300}>
            <Pie
              data={chartDataSemana}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
            >
              {chartDataSemana.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* Gráfica del mes */}
          <PieChart width={300} height={300}>
            <Pie
              data={chartDataMes}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
            >
              {chartDataMes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          El promedio de Becas cobradas es de un 80% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          visualizador  en grafica
        </div>
      </CardFooter>
    </Card>
  );
}