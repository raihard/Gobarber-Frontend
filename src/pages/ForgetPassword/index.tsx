import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import Logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

// import api from '../../services/api';
import { Container, Content, Background } from './styles';

const ForgetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      formRef.current?.setErrors(getValidationErros(error));
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Esqueci minha senha</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Button type="submit">Enviar</Button>
        </Form>

        <Link to="/">
          <FiLogIn size={20} />
          <span>Voltar para logon</span>
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgetPassword;
