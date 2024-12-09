import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { RegistroForm } from "@/components/login/registro-usuario-form";

export default function LoginForm() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <div className="flex flex-1 items-center justify-center">
            <Image
              className="w-64"
              quality={100}
              width={300}
              height={400}
              src="/logo.png"
              alt="avatar"
            />
          </div>
          <CardTitle className="text-2xl">Registrarse</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <RegistroForm></RegistroForm>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Regresar a Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
