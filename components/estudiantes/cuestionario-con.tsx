"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"; 
import useApi from "@/lib/api";

// Validación del formulario
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
  estatus: z.boolean(),
});

export function cuestionarioForm() {
  const fetchWithAuth = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      numeroControl: "",
      grado: "",
      grupo: "",
      domicilio: "",
      curp: undefined,
      credencial: undefined,
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

    const resp = await fetchWithAuth("/estudiantes", {
      method: "POST",
      body: formData,
    });

    // Log the response to check for success or errors
    console.log(resp);
    console.log(await resp.json());

    // Optionally, you can handle the response here, e.g., show a success message or error message to the user
    if (resp.ok) {
      // Show success message
    } else {
      // Show error message
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Campos del formulario */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} />
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
                <Input placeholder="Herrera" {...field} />
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
                <Input placeholder="2xxxxxxx" {...field} />
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
                <Input placeholder="4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grupo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo:</FormLabel>
              <FormControl>
                <Input placeholder="A,B,C,D,F" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domicilio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domicilio:</FormLabel>
              <FormControl>
                <Input placeholder="Calle 123" {...field} />
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
              <FormLabel>CURP:</FormLabel>
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

        <FormField
          control={form.control}
          name="credencial"
          render={({}) => (
            <FormItem>
              <FormLabel>Credencial:</FormLabel>
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
        <div className="flex gap-16 justify-center"> 
  <Button type="submit" className="w-1/3"> 
    Enviar
  </Button>
  <Button type="submit" className="w-1/3">
    Modificar
  </Button>
</div>
      </form>
    </Form>
  );
}