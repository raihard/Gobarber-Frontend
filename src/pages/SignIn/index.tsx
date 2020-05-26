import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import Logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, ContentAnimated, Content, Background } from './styles';

interface SignInProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { SignIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { email, password } = data;
        await SignIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErros(error));
        } else {
          addToast({
            title: 'Atenção',
            type: 'error',
            Description: 'E-mail/Senha não confere',
          });
        }
      }
    },
    [SignIn, addToast],
  );

  return (
    <Container>
      <Content>
        <ContentAnimated>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/ForgetPassword">Esqueci minha senha</Link>
          </Form>

          <Link to="/SignUp">
            <FiLogIn size={20} />
            <span>Criar conta</span>
          </Link>
        </ContentAnimated>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
