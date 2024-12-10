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

const formSchema = z.object({
  email: z.string().email({ message: "Este tipo de correo es invalido" }),
  password: z.string().min(8, { message: "El minimo de caracteres es 8" }),
  idRol: z.number(),
});

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/store/sesion-store";

export function RegistroForm() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      idRol: 3,
    },
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const userData = await res.json();
      const user = JSON.parse(
        Buffer.from(userData.accessToken.split(".")[1], "base64").toString()
      );
      setUser({
        ...user,
        token: userData.accessToken,
        refreshToken: userData.refreshToken,
      });
      router.push("/aplicacion");
    } else {
      form.setError("root", {
        type: "required",
        message: data.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@accitesz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Contraseña</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormRootError />
        <Button type="submit" className="w-full">
          Registrar
        </Button>
      </form>
    </Form>
  );
}
