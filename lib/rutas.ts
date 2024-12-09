type Ruta = {
  label: string;
  href: string;
  rol: number[];
};

export const rutas: Ruta[] = [
  {
    label: "Perfil",
    href: "/aplicacion/perfil",
    rol: [3,5],
  },
  {
    label: "Convocatorias",
    href: "/aplicacion/convocatorias",
    rol: [3,5],
  },
  {
    label: "Questionario",
    href: "/aplicacion/questionarioConvocatorias",
    rol: [3,5],
  },
  {
    label: "Reportes",
    href: "/aplicacion/reportes",
    rol: [5,3],
  },
  {
    label: "Programaciones",
    href: "/aplicacion/programaciones",
    rol: [4,1],
  },
  {
    label: "Solicitantes",
    href: "/aplicacion/solicitantes",
    rol: [4,1],
  },
  {
    label: "Reportes",
    href: "/aplicacion/reportesTS",
    rol: [4,1],
  },
  {
    label: "Nuevo Reporte",
    href: "/aplicacion/nuevoReporte",
    rol: [4,1],
  },
  {
    label: "Lista de Becarios",
    href: "/aplicacion/listaBecarios",
    rol: [4,1],
  },
  {
    label: "Documentacion",
    href: "/aplicacion/documentacion",
    rol: [2,1],
  },
  {
    label: "Reportes",
    href: "/aplicacion/reportesAdministrador",
    rol: [2,1],
  },
  {
    label: "Lista de Solicitantes",
    href: "/aplicacion/listaSolicitantes",
    rol: [2,1],
  },
  {
    label: "Nueva Convocatoria",
    href: "/aplicacion/nuevaConvocatoria",
    rol: [2,1],
  },
];
