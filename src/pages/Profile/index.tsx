import React, {
  useCallback,
  useRef,
  ChangeEvent,
  useMemo,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  ContentAnimated,
  Content,
  Header,
  HeaderContent,
  Avatar,
  ContentAvatar,
} from './styles';
import { useAuth } from '../../context/AuthContext';
import { ref } from 'yup';

interface SignUpProps {
  name: string;
  email: string;
  oldpassword: string;
  password: string;
  confirmPassword: string;
}

interface User {
  avatar: string;
  avatar_url: string;
  email: string;
  id: string;
  name: string;
}

const Profile: React.FC = () => {
  const { user, token, SignOut, updateUser } = useAuth();
  const { addToast } = useToast();
  const History = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        console.log(e.target.files[0]);
        const response = await api.patch<User>(`users/avatar`, formData);
        const user = response.data;
        await updateUser(user);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: SignUpProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          oldpassword: Yup.string(), // Yup.string().required('Senha aniga obrigatório'),
          password: Yup.string().when('oldpassword', {
            is: val => !val.length,
            then: Yup.string(),
            otherwise: Yup.string().min(6, 'No mínimo 6 Digitos'),
          }),

          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem corresponder',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { name, email, oldpassword, password, confirmPassword } = data;
        api
          .put('profile', {
            name,
            email,
            ...(password && { oldpassword, password }),
          })
          .then(async response => {
            const user = response.data;
            await updateUser(user);
            // History.push('/');

            addToast({
              title: 'Atualizado com Sucesso!',
              type: 'sucess',
              // Description: 'Faça o seu login',
            });
          })
          .catch((err: { status: string; message: string }) => {
            console.log(err);

            addToast({
              title: 'Atenção',
              type: 'error',
              Description: 'Erro ao tentar Cadastrar, Tente novamente',
            });
          });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErros(error));
        } else {
        }
      }
    },
    [History, addToast],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <FiArrowLeft size={20} />
          </Link>
        </HeaderContent>
      </Header>
      <Content>
        <ContentAnimated>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ name: user.name, email: user.email }}
          >
            <ContentAvatar>
              <Avatar avatarUrl={user.avatar_url} />
              <label htmlFor="avatar">
                <FiCamera size={20} />
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </ContentAvatar>

            <h1>Meu Perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="oldpassword"
              icon={FiLock}
              type="password"
              placeholder="Senha Atual"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Senha Atual"
            />
            <Button type="submit">Atualizar</Button>
          </Form>
        </ContentAnimated>
      </Content>
    </Container>
  );
};

export default Profile;
