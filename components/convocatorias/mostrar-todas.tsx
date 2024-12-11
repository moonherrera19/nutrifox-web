"use client";
// import useApi from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import Link from "next/link";

interface Imagen {
  type: string;
  data: number[];
}

interface Convocatoria {
  idConvocatoria: number;
  fechaApertura: string;
  fechaCierre: string;
  fechaInicio: string;
  fechaFin: string;
  imagen: Imagen;
  nombre: string;
  estatus: boolean;
}

export default function MostrarConvocatorias() {
  // const fetchWithAuth = useApi();
  const [convocatorias, setConvocatorias] = useState<Convocatoria[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetchWithAuth("/convocatorias");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/convocatorias`
      );
      const data = await res.json();
      setConvocatorias(data);
    };
    fetchData();
  }, []);

  const downloadImage = (convocatoria: Convocatoria) => {
    const imageSrc = `data:image/png;base64,${toBase64(
      convocatoria.imagen.data
    )}`;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `${convocatoria.nombre || "imagen"}.png`;
    link.click();
  };

  function toBase64(arr: number[]): string {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {convocatorias.length > 0 ? (
        convocatorias.map((convocatoria) => (
          <Card key={convocatoria.idConvocatoria}>
            <CardHeader>
              <div className="flex items-center justify-center">
                <Image
                  src={`data:image/png;base64,${toBase64(
                    convocatoria.imagen.data
                  )}`}
                  alt={convocatoria.nombre}
                  width={400}
                  height={400}
                  className="object-cover w-48 rounded-xl"
                />
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-black mb-2">
                {convocatoria.nombre || "Sin título"}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold">Apertura:</p>
                  <p className="text-sm">
                    {format(new Date(convocatoria.fechaApertura), "PPP", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Cierre:</p>
                  <p className="text-sm">
                    {format(new Date(convocatoria.fechaCierre), "PPP", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Inicio:</p>
                  <p className="text-sm">
                    {format(new Date(convocatoria.fechaInicio), "PPP", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Fin:</p>
                  <p className="text-sm">
                    {format(new Date(convocatoria.fechaFin), "PPP", {
                      locale: es,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid grid-cols-2 gap-2 w-full">
                {convocatoria.estatus ? (
                  <Button
                    className="w-full bg-black hover:opacity-85	hover:bg-black"
                    asChild
                  >
                    <Link href="/aplicacion/solicitudes/aplicar">Aplicar</Link>
                  </Button>
                ) : (
                  <Button className="w-full" variant="destructive" disabled>
                    Convocatoria cerrada
                  </Button>
                )}
                <Button
                  className="w-full"
                  onClick={() => downloadImage(convocatoria)}
                >
                  Descargar convocatoria
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <h2 className="font-bold text-4xl">No hay convocatorias disponibles</h2>
      )}
    </div>
  );
}
