import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLogIn, FiLock } from 'react-icons/fi';
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

interface ResetProps {
  password: string;
  passwordConfirm: string;
}

const ForgetPassword: React.FC = () => {
  const History = useHistory();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ResetProps) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 Digitos'),
          passwordConfirm: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas devem corresponder',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const token = location.search.replace('?token=', '');
        if (!token) new Error();

        await api
          .post('/password/reset', {
            token,
            password: data.password,
            password_confirmation: data.passwordConfirm,
          })
          .then(response => {
            History.push('/');

            addToast({
              title: 'Senha Alterada!',
              type: 'sucess',
              Description: 'Faça o seu login',
            });
          })
          .catch(err => {
            console.log(err);

            addToast({
              title: 'Atenção',
              type: 'error',
              Description: `Erro ao tentar alterar a senha, Tente novamente`,
            });
          });
      } catch (error) {
        formRef.current?.setErrors(getValidationErros(error));
      } finally {
        setLoading(false);
      }
    },
    [addToast, History, location],
  );

  return (
    <Container>
      <Content>
        <ContentAnimated>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Nova Senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="passwordConfirm"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />
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
