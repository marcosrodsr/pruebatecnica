"use client"; // Esto marca el archivo como un componente cliente

import React, { createContext, useContext, useReducer } from 'react';

type StateType = {
  isAuthenticated: boolean;
};

type ActionType = { type: 'LOGIN' } | { type: 'LOGOUT' };

const initialState: StateType = {
  isAuthenticated: false,
};

const GlobalStateContext = createContext<StateType | undefined>(undefined);
const GlobalDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

function globalStateReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return context;
};
