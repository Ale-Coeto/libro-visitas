'use client'
import { useState } from 'react'
import { useMessages } from '@/app/hooks/useMessages'
import { useSendMessage } from '@/app/hooks/useSendMessages'

export default function Home() {
  const { messages, loading, error, refresh } = useMessages()
  const { sendMessage } = useSendMessage()

  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !mensaje) return

    try {
      setEnviando(true)
      await sendMessage(nombre, mensaje)
      setNombre('')
      setMensaje('')
      refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Libro de Visitas</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={enviando}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <hr />

      <div className="space-y-4">
        {loading && <p className="text-gray-600">Cargando mensajes...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {messages.map((msg) => (
          <div key={msg.id} className="border rounded p-4 bg-black-50">
            <p className="text-sm text-black-600">{msg.fecha}</p>
            <p className="font-semibold">{msg.nombre}</p>
            <p>{msg.mensaje}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
