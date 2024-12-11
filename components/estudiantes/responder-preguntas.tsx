"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const preguntasSchema = z.object({
  id: z.string(),
  respuesta: z.string().min(1, { message: "Selecciona una respuesta" }),
});

const FormSchema = z.object({
  kardex: z.any().refine((file) => file?.length == 1, "Sube tu kardex"),
  cartaMotivos: z
    .any()
    .refine((file) => file?.length == 1, "Sube tu carta de motivos"),
  respuestas: z.array(preguntasSchema), // No se define la longitud, se obtendrá de la API
});

export default function PreguntasForm() {
  const [preguntas, setPreguntas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      kardex: undefined,
      cartaMotivos: undefined,
      respuestas: [],
    },
  });

  const kardexRef = form.register("kardex");
  const cartaMotivosRef = form.register("cartaMotivos");

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/preguntas`);
        const data = await res.json();
        setPreguntas(data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("kardex", values.kardex[0]);
    formData.append("cartaMotivos", values.cartaMotivos[0]);
    values.respuestas.forEach((answer, index) => {
      formData.append(`respuestas[${index}]`, answer.respuesta);
    });

    // Aquí debes enviar el formData a tu API
    console.log("FormData:", formData);
    // ... lógica para enviar el formulario ...
  }

  const radioGroupOptions = [
    "Excelente",
    "Mucha",
    "Normal",
    "Casi nula",
    "Nula",
  ];

  if (isLoading) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo para subir kardex */}
        <FormField
          control={form.control}
          name="kardex"
          render={({}) => (
            <FormItem>
              <FormLabel>Kardex:</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*, application/pdf"
                  className="file:bg-orange-50 file:text-primary hover:file:bg-orange-100 file:border file:border-solid file:border-primary file:rounded-sm"
                  {...kardexRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para subir carta de motivos */}
        <FormField
          control={form.control}
          name="cartaMotivos"
          render={({}) => (
            <FormItem>
              <FormLabel>Carta de Motivos:</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="file:bg-orange-50 file:text-primary hover:file:bg-orange-100 file:border file:border-solid file:border-primary file:rounded-sm"
                  {...cartaMotivosRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preguntas del formulario */}
        {preguntas.map((pregunta, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`respuestas.${index}`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{pregunta.titulo}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value.respuesta}
                    className="flex flex-col space-y-1"
                  >
                    {radioGroupOptions.map((option) => (
                      <FormItem
                        key={option}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
