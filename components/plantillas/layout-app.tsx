"use client";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";

import BarraLateral from "./barra-lateral";
import { rutas } from "@/lib/rutas";
import { Toaster } from "@/components/ui/toaster";

export default function Component({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <BarraLateral />
      <SidebarInset>
        <header className="flex h-20 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {rutas.map(
            (ruta) =>
              ruta.href === pathname && <h2 key={ruta.href}>{ruta.label}</h2>
          )}
          <div className="flex-1 flex items-center justify-end">
            {/* <h1 className="font-bold">Nutrifox</h1> */}
            <Image
              className="h-12 w-24 rounded-full"
              quality={100}
              width={300}
              height={400}
              src="/nutri-fox.png"
              alt="avatar"
            />
            <Image
              className="h-16 w-16 rounded-full"
              quality={100}
              width={400}
              height={400}
              src="/zorro.png"
              alt="avatar"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
