import React, { useState } from 'react';

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

type Props = {
  onNewMessage: (msg: Message) => void;
};

export function MessageForm({ onNewMessage }: Props) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, text }),
    });
    if (res.ok) {
      const newMsg: Message = await res.json();
      onNewMessage(newMsg);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Tu mensaje"
        value={text}
        onChange={e => setText(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Enviar
      </button>
    </form>
  );
}

