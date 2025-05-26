import { useEffect, useState } from 'react'

export interface Message {
  id: number
  nombre: string
  mensaje: string
  fecha: string
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${apiUrl}/messages`)
      if (!res.ok) throw new Error('Error al obtener los mensajes')
      const data = await res.json()
      setMessages(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return { messages, loading, error, refresh: fetchMessages }
}
