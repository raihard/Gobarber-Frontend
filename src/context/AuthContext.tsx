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

interface User {
  avatar: string;
  avatar_url: string;
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  SignIn(data: SignInProps): Promise<void>;
  // SignUp(data: SignUpProps): Promise<void>;
  SignOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@gobaber:token');
    const user = localStorage.getItem('@gobaber:user');
    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const SignIn = useCallback(
    async ({ email, password }) => {
      await api
        .post<AuthState>('sessions', { email, password })
        .then(response => {
          console.log('response', response);

          const { token, user } = response.data;
          localStorage.setItem('@gobaber:token', token);
          localStorage.setItem('@gobaber:user', JSON.stringify(user));
          setData({ token, user });
        });
    },
    [data],
  );

  const SignOut = useCallback(() => {
    localStorage.removeItem('@gobaber:token');
    localStorage.removeItem('@gobaber:user');
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
