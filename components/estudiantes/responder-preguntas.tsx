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
  FormRootError,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const radioGroupOptions = [
  "Excelente",
  "Mucha",
  "Normal",
  "En desacuerdo",
  "Totalmente en desacuerdo",
];

const FormSchema = z.object({
  kardex: z.any().refine((file) => file?.length === 1, "Sube tu kardex"),
  cartaMotivos: z
    .any()
    .refine((file) => file?.length === 1, "Sube tu carta de motivos"),
  respuestas: z.array(
    z.object({
      idPregunta: z.number(),
      respuesta: z.string().min(1, { message: "Selecciona una respuesta" }),
    })
  ),
});

type Pregunta = {
  idPregunta: number;
  titulo: string;
};

import { useAtom } from "jotai";
import { userAtom } from "@/store/sesion-store";

export default function PreguntasForm({
  idConvocatoria,
}: {
  idConvocatoria: string;
}) {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [user] = useAtom(userAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      kardex: undefined,
      cartaMotivos: undefined,
      respuestas: [],
    },
    mode: "all",
  });

  const { reset } = form;
  const kardexRef = form.register("kardex");
  const cartaMotivosRef = form.register("cartaMotivos");

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/preguntas`);
        const data = await res.json();
        setPreguntas(data);
        reset({
          kardex: undefined,
          cartaMotivos: undefined,
          respuestas: data.map((pregunta: Pregunta) => ({
            idPregunta: pregunta.idPregunta,
            respuesta: "",
          })),
        });
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreguntas();
  }, [reset]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const formData = new FormData();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/estudiantes/usuario/${user?.idUsuario}`
    );
    const estudiante = await response.json();

    formData.append("idConvocatoria", idConvocatoria);
    formData.append("idEstudiante", estudiante.idEstudiante);
    formData.append("kardex", values.kardex[0]);
    formData.append("cartaMotivos", values.cartaMotivos[0]);
    values.respuestas.forEach((respuesta) => {
      formData.append(
        `respuestas`,
        JSON.stringify({
          idPregunta: respuesta.idPregunta,
          respuesta: respuesta.respuesta,
        })
      );
    });

    console.log(values);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/solicitudes`, {
      method: "POST",
      body: formData,
    });

    console.log(res);
    console.log(await res.json());

    // Aquí debes enviar el formData a tu API
  }

  if (isLoading) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name={`respuestas.${index}.respuesta`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{pregunta.titulo}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) =>
                      field.onChange({
                        target: {
                          value,
                          name: `respuestas.${index}.respuesta`,
                        },
                      })
                    }
                    value={field.value || ""}
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
        <FormRootError />
      </form>
    </Form>
  );
}
