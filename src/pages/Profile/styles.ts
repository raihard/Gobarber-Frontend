import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';
import SignInBackground from '../../assets/attachment.png';

interface IAvatarProps {
  avatarUrl: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConfigContentAnimated = keyframes`
  from {
    opacity:0;
    transform: translateY(50px);
  }
  to{
    opacity:1;
    transform: translateY(0);
  }
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 80px;

  a {
    color: #999591;
    text-decoration: none;
  }
  button {
    margin-left: auto;
    border: 0;
    background: transparent;
    svg {
      width: 25px;
      height: 25px;
      color: #999591;
    }
  }
`;

export const ContentAvatar = styled.div`
  align-self: center;
  margin-bottom: 32px;
  position: relative;
  width: 186px;

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    right: 0;
    bottom: 0;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Avatar = styled.div<IAvatarProps>`
  height: 186px;
  width: 186px;
  border-radius: 50%;
  ${props =>
    css`
      background: lightblue url(${props.avatarUrl}) no-repeat center center;
      background-size: auto 186px;
    `}
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: -96px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ContentAnimated = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  animation: ${ConfigContentAnimated} 1s;

  form {
    width: 340px;
    display: flex;
    flex-direction: column;
    place-content: center;

    & > :nth-child(5) {
      margin-top: 35px;
    }

    h1 {
      font-size: 20px;
      margin-bottom: 24px;
      text-align: left;
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
