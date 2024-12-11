import PreguntasForm from "@/components/estudiantes/responder-preguntas";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2 className="font-bold text-3xl">Aplicar para beca</h2>
      <PreguntasForm idConvocatoria={params.id} />
    </div>
  );
}
