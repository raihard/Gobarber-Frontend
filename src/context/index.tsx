import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

const Context: React.FC = ({ children }) => {
  return (
    <>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </>
  );
};

export default Context;
