import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, ContentAnimated, Content, Background } from './styles';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const History = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignUpProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório'),
          // .email('Digite um e-mail válido'),
          password: Yup.string(), //.min(6, 'No mínimo 6 Digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { name, email, password } = data;
        api
          .post('users', { name, email, password })
          .then(response => {
            History.push('/');

            addToast({
              title: 'Bem vindo ao Gobaber!',
              type: 'sucess',
              Description: 'Faça o seu login',
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
      <Background />
      <Content>
        <ContentAnimated>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiLogIn size={20} />
            <span>Voltar para logon</span>
          </Link>
        </ContentAnimated>
      </Content>
    </Container>
  );
};

export default SignUp;
