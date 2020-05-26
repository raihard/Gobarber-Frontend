import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInProps {
  email: string;
  password: string;
}

// interface SignUpProps extends SignInProps {
//   name: string;
//   // email: string;
//   // password: string;
// }

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  SignIn(data: SignInProps): Promise<void>;
  // SignUp(data: SignUpProps): Promise<void>;
  SignOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GithabExplore:token');
    const user = localStorage.getItem('@GithabExplore:user');
    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const SignIn = useCallback(
    async ({ email, password }) => {
      await api
        .post<AuthState>('sessions', { email, password })
        .then(response => {
          const { token, user } = data;
          localStorage.setItem('@GithabExplore:token', token);
          localStorage.setItem('@GithabExplore:user', JSON.stringify(user));
          setData({ token, user });
        });
    },
    [data],
  );

  const SignOut = useCallback(() => {
    localStorage.removeItem('@GithabExplore:token');
    localStorage.removeItem('@GithabExplore:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Utilizar useAuth com AuthProvider');
  return context;
}
export { useAuth, AuthProvider };
