import styled, { keyframes } from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
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
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  svg {
    width: 60px;
    height: 60px;
    color: #999591;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
    strong {
      color: #ff9000;
    }
  }
`;
