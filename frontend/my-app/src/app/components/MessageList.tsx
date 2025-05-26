import React from 'react';

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul className="space-y-2 mt-4">
      {messages.map(m => (
        <li key={m.id} className="border p-2 rounded">
          <p className="font-medium">{m.name}</p>
          <p>{m.text}</p>
          <span className="text-xs text-gray-500 block text-right">
            {new Date(m.createdAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

