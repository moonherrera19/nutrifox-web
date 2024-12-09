"use client";

import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCheckActive from "@/hooks/use-check-active";

import Link from "next/link";
import { rutas } from "@/lib/rutas";

import { userAtom } from "@/store/sesion-store";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";

// Resetear el estado de la sesion
export default function BarraLateral() {
  const { checkActive } = useCheckActive();
  const [user, setUser] = useAtom(userAtom);

  console.log(user)

  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full flex items-center justify-between">
              {/* <Avatar className="h-16 w-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar> */}
              <h2 className="font-bold text-sm">{user?.email}</h2>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* El map es para mostrar datos de un arreglo*/}
              {rutas.map((ruta) =>
                ruta.rol.map(
                  (rolUsuario) =>
                    user?.rol === rolUsuario && (
                      <SidebarMenuItem key={ruta.label}>
                        <SidebarMenuButton
                          asChild
                          isActive={checkActive(ruta.href)}
                        >
                          <Link href={ruta.href}>{ruta.label}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          onClick={() => {
            setUser(RESET);
            router.push("/");
          }}
        >
          Cerrar sesión
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
