"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

//import { es } from "date-fns/locale";


import useApi from "@/lib/api";

//validamos si lo que colocan es valido  para los campos propuestos 
const formSchema = z.object({
  nombre: z.string().min(10, { message: "Coloca un nombre valido" }),
  apellido: z.string().min(10, { message: "Coloca un apellido valido" }),
  numeroControl: z
    .string()
    .min(10, { message: "Coloca el número de control valido" }),
  grado: z.string().min(10, { message: "Coloca un grado valido" }),
  grupo: z.string().min(10, { message: "Coloca un grupo valido" }),
  domicilio: z.string().min(10, { message: "Coloca un domicilio valido" }),
  curp: z.any().refine((file) => file?.length == 1, "Coloca una imagen valida"),
  credencial: z
    .any()
    .refine((file) => file?.length == 1, "Coloca una imagen valida"),
  estatus: z.boolean(), // Agregar el campo estatus al esquema
});

export function EstudiantesForm() {
  //const fetchWithAuth = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      numeroControl: "",
      grado: "",
      grupo: "",
      domicilio:"",
      curp: undefined,
      credencial:undefined,

    },
    mode: "all",
  });

  const curpRef = form.register("curp"); 
  const credencialRef = form.register("credencial");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("nombre", values.nombre); 
    formData.append("apellido", values.apellido);
    formData.append("numeroControl", values.numeroControl);
    formData.append("grado", values.grado);
    formData.append("grupo", values.grupo);
    formData.append("domicilio", values.domicilio);
  

    if (values.curp[0]) formData.append("curp", values.curp[0]);
    if (values.credencial[0]) formData.append("credencial", values.credencial[0]);

    // const res = await fetchWithAuth("/convocatorias", {
    //   method: "POST",
    //   body: formData,
    // });

    const res = await fetch("http://localhost:3001/estudiantes", {
      method: "POST",
      body: formData,
    });

    console.log(res);
    console.log(await res.json());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Juan"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Herrera"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <FormField
          control={form.control}
          name="numeroControl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Control:</FormLabel>
              <FormControl>
                <Input
                  placeholder="2xxxxxxx"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grado:</FormLabel>
              <FormControl>
                <Input
                  placeholder="4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="grupo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo:</FormLabel>
              <FormControl>
                <Input
                  placeholder="A,B,C,D,F"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />  
        <FormField
          control={form.control}
          name="curp"
          render={({}) => (
            <FormItem>
              <FormLabel>curp</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="file:bg-orange-50 file:text-primary hover:file:bg-orange-100 file:border file:border-solid file:border-primary file:rounded-sm"
                  {...curpRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
// para cargar la imagen de la credencial
        
        <FormField
          control={form.control}
          name="credencial"
          render={({}) => (
            <FormItem>
              <FormLabel>Credencial</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="file:bg-orange-50 file:text-primary hover:file:bg-orange-100 file:border file:border-solid file:border-primary file:rounded-sm"
                  {...credencialRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormRootError />
        <Button type="submit" className="w-full">
          Enviar
        </Button>
        <Button type="submit" className="w-full">
          Modificar
        </Button>
        </form>
       </Form>
  );
}
