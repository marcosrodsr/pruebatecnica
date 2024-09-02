"use client";  // Este archivo está diseñado para manejar toda la lógica del cliente

import React from 'react';
import { GlobalStateProvider } from '../context/GlobalState';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalStateProvider>
      {children}
    </GlobalStateProvider>
  );
};

export default ClientProviders;
