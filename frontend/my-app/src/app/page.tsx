// import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Libro de Visitas</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Tu mensaje"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>

      <hr />

      <div className="space-y-4">
        <div className="border rounded p-4 bg-black-50">
          <p className="text-sm text-black-600">2025-05-26</p>
          <p className="font-semibold">Juan Pérez</p>
          <p>¡Me encantó el sitio!</p>
        </div>

        <div className="border rounded p-4 bg-black-50">
          <p className="text-sm text-black-600">2025-05-25</p>
          <p className="font-semibold">Ana Gómez</p>
          <p>Saludos desde Madrid.</p>
        </div>
      </div>
    </main>
  )
}
