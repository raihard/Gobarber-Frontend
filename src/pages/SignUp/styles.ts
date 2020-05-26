import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import SignInBackground from '../../assets/attachment.png';
export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  place-content: center;
`;

const ConfigContentAnimated = keyframes`
  from {
    opacity:0;
    transform: translateX(50px);
  }
  to{
    opacity:1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

export const ContentAnimated = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  animation: ${ConfigContentAnimated} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      margin-top: 24px;
      display: block;
      border: 0;
      background: inherit;
      color: #c1c1c1;
      margin-top: 24px;
      text-decoration: none;
      transition: all 0.2s;
      &:hover {
        color: ${shade(0.2, '#c1c1c1')};
      }
    }
  }

  > a {
    display: flex;
    place-content: center;
    text-decoration: none;
    margin-top: 24px;
    color: #ff9000;
    transition: all 0.2s;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat;
  background-size: cover;
`;
