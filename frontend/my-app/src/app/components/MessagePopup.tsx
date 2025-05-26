import React, { useEffect } from 'react';

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

export function MessagePopup({ message, onClose }: { message: Message; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded">
      <p className="font-bold">{message.name}</p>
      <p>{message.text}</p>
      <span className="text-xs text-gray-500 absolute bottom-1 right-2">
        {new Date(message.createdAt).toLocaleString()}
      </span>
    </div>
  );
}
