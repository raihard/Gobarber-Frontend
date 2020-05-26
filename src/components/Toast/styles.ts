import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'info' | 'sucess' | 'error';
}

const TypeToast = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  sucess: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;
export const ToastItem = styled(animated.div)<ToastProps>`
  position: relative;
  width: 360px;
  border-radius: 6px;
  padding: 16px 30px 16px 16px;
  display: flex;
  align-items: center;

  translate: all 0.2s;

  & + div {
    margin-top: 8px;
  }
  ${props => TypeToast[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
    margin-top: 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    background: transparent;
    border: 0;
    color: inherit;
    opacity: 0.5;
  }
`;
