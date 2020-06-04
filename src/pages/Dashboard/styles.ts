import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IAvatarProps {
  avatarUrl: string;
}

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

  a {
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
export const Avatar = styled.div<IAvatarProps>`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  ${props =>
    css`
      background: lightblue url(${props.avatarUrl}) no-repeat center center;
      background-size: auto 60px;
    `}
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

export const Content = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 64px auto;
  margin-top: 60px;
`;

export const Schedule = styled.div`
  flex: 2;
  p {
    margin-top: 10px;
    color: #ff9000;
  }
  > div {
    margin-top: 60px;
    > span {
      color: #999591;
    }
  }
`;

export const AppointmentNext = styled.div`
  &::before {
    position: absolute;
    height: 80%;
    width: 1px;
    left: 0;
    top: 10%;
    content: '';
    background: #ff9000;
  }

  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  background: #3e3b47;
  border-radius: 10px;
  height: 112px;
  position: relative;
  margin-bottom: 20px;

  > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }

  > svg {
    width: 60px;
    height: 60px;
    color: #999591;
    margin-right: 16px;
  }

  > div {
    color: #999591;
    margin-left: auto;
    display: flex;
    align-items: center;

    > svg {
      margin-right: 5px;
      width: 20px;
      height: 20px;
      color: #ff9000;
    }
  }
`;
export const AppointmentsDay = styled.div`
  > span {
    display: block;
    color: #999591;
  }

  hr {
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid #3e3b47;
  }

  > div {
    display: flex;
    align-items: center;
    /* align-content: center; */
    margin-right: 5px;

    > svg {
      margin-right: 5px;
      width: 20px;
      height: 20px;
      color: #ff9000;
    }

    > span {
      font-size: 16px;
      margin-right: 16px;
    }

    > div {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      background: #3e3b47;
      border-radius: 10px;
      height: 80px;
      margin-bottom: 20px;

      > img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 20px;
      }

      > svg {
        width: 50px;
        height: 50px;
        color: #999591;
        margin-right: 16px;
      }
    }
  }
`;

export const NotAppointment = styled.div`
  display: flex;
  align-items: center;
  color: #999591;
`;
export const Calendar = styled.div`
  margin-left: 120px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #ff9000 !important;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
