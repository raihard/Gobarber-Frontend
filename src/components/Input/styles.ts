import styled, { css } from 'styled-components';
import Tootip from '../Tootip';

interface FormProps {
  isFocus: boolean;
  isBlur: boolean;
  isError: boolean;
}

export const Container = styled.div<FormProps>`
  color: #666;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 12px;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  input {
    color: #fff;
    background: transparent;
    border: 0;
    width:100%;
    &::placeholder {
      color: #666;
    }
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.isFocus &&
    css`
      border-color: #f48404;
      svg {
        color: #f48404;
      }
    `}

  ${props =>
    props.isBlur &&
    css`
      svg {
        color: #f48404;
      }
    `}

  ${props =>
    props.isError &&
    css`
      border-color: #c20;
      svg {
        color: #c20;
      }
    `}
`;

export const Error = styled(Tootip)`
  height: 20px;
  margin-left: 12px;
  svg {
    margin: 0;
  }

  span {
    background: #c20;
    &::before {
      border-color: #c20 transparent;
    }
  }
`;
