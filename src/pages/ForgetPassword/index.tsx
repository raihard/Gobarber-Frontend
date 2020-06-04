import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';
import Logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, ContentAnimated, Background } from './styles';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface ForgotProps {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotProps) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api
          .post('/password/forgot', { email: data.email })
          .then(response => {
            // History.push('/');
            formRef.current?.reset();
            addToast({
              title: 'Solicitação enviada!',
              type: 'sucess',
              duraction: 10000,
              Description:
                'Faça a confirmação da solicitação reset de senha, no link enviado para o seu e-mail!!!',
            });
          })
          .catch(err => {
            console.log(err);

            addToast({
              title: 'Atenção',
              type: 'error',
              Description: `[${err}] Erro ao tentar enviar o email, Tente novamente`,
            });
          });
      } catch (error) {
        formRef.current?.setErrors(getValidationErros(error));
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <ContentAnimated>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Esqueci minha senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Enviar
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn size={20} />
            <span>Voltar para logon</span>
          </Link>
        </ContentAnimated>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgetPassword;
