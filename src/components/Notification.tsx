"use client";

import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-white">
          ✕
        </button>
      </div>
    </div>
  );
}
