import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';
import Toast from '../components/Toast';

export interface ToastMessage {
  id: string;
  duraction?: number;
  type: 'info' | 'sucess' | 'error';
  title: string;
  Description?: string;
}

interface ToastContextData {
  addToast(data: Omit<ToastMessage, 'id'>): void;
  removeToasd(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, duraction, Description }: Omit<ToastMessage, 'id'>) => {
      setMessages([
        ...messages,
        { id: uuid(), type, title, duraction, Description },
      ]);
    },
    [messages],
  );
  const removeToasd = useCallback((id: string) => {
    setMessages(messages => messages.filter(massage => massage.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToasd }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) throw new Error('Utilizar useToast com ToastProvider');
  return context;
}
export { useToast, ToastProvider };
