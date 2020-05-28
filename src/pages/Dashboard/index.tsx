import React from 'react';
import { useAuth } from '../../context/AuthContext';

import { Container, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
const Dashboard: React.FC = () => {
  const { user, SignOut } = useAuth();
  console.log('user', user);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="GoBarber" />
            ) : (
              <FaUserCircle />
            )}
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={SignOut} title="Sair">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};
export default Dashboard;
