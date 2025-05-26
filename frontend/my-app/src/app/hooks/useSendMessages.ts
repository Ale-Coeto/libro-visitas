export function useSendMessage() {
  const sendMessage = async (nombre: string, mensaje: string) => {
    const res = await fetch('https://libro-visitas-production.up.railway.app/api/messages', {
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
