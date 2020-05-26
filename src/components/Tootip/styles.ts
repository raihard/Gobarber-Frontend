import styled from 'styled-components';
// import { shade } from 'polished';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #f48404;
    color: #fff;
    font-size: 14px;
    padding: 8px;
    border-radius: 4px;
    opacity: 0;
    transition: all 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #f48404 transparent;
      border-width: 8px 8px 0 8px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
