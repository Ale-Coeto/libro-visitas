export function useSendMessage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const sendMessage = async (nombre: string, mensaje: string) => {
    const res = await fetch(`${apiUrl}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, mensaje }),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Error al enviar mensaje')
    }

    return await res.json()
  }

  return { sendMessage }
}
