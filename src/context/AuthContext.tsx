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
  token: string;
  SignIn(data: SignInProps): Promise<void>;
  SignOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@gobaber:token');
    const user = localStorage.getItem('@gobaber:user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const SignIn = useCallback(async ({ email, password }) => {
    await api
      .post<AuthState>('sessions', { email, password })
      .then(response => {
        console.log('response', response);

        const { token, user } = response.data;
        localStorage.setItem('@gobaber:token', token);
        localStorage.setItem('@gobaber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, user });
      });
  }, []);

  const SignOut = useCallback(() => {
    localStorage.removeItem('@gobaber:token');
    localStorage.removeItem('@gobaber:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async user => {
      localStorage.setItem('@gobaber:user', JSON.stringify(user));
      setData({ token: data.token, user });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        SignIn,
        SignOut,
        updateUser,
      }}
    >
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
