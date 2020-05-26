import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border: 0;
  margin-top: 20px;
  padding: 16px 0;
  width: 100%;
  border-radius: 10px;
  background: #f48404;
  font-weight: bold;
  color: #333;
  transition: all 0.2s;

  &:hover {
    color: #111;
    background: ${shade(0.2, '#f48404')};
  }
`;
