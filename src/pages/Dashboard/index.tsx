import React, { useEffect, useState, useCallback, useMemo } from 'react';
import moment from 'moment';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { useAuth } from '../../context/AuthContext';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';

import {
  Container,
  Header,
  HeaderContent,
  Avatar,
  Profile,
  Content,
  Schedule,
  Calendar,
  AppointmentNext,
  AppointmentsDay,
  NotAppointment,
} from './styles';
import logo from '../../assets/logo.svg';
import { FiPower, FiUser, FiClock } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Appointment {
  id: string;
  provider_UserId: string;
  user_id: string;
  date: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

interface IMonthAvailability {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { user, token, SignOut } = useAuth();

  const [selectMonth, setSelectManth] = useState(new Date());

  const disabledMonthDays = useMemo(() => {
    return [new Date('2020-05-22 00:00')];
  }, []);

  const [monthAvailability, setMonthAvailability] = useState<
    IMonthAvailability[]
  >([] as IMonthAvailability[]);

  const [selectDate, setSelectDate] = useState(new Date());

  const [appointments, setAppointments] = useState<Appointment[]>(
    [] as Appointment[],
  );

  const handleMonthChange = useCallback(async (month: Date) => {
    setSelectManth(month);
  }, []);

  useEffect(() => {
    async function appointmentsFind() {
      const response = await api.get<IMonthAvailability[]>(
        `/${
          user.id
        }/MonthAvailability?year=${selectMonth.getFullYear()}&month=${
          selectMonth.getMonth() + 1
        }`,
      );
      setMonthAvailability(response.data);
    }
    appointmentsFind();
  }, [selectMonth, token, user]);

  const handleDateChange = useCallback(
    async (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) setSelectDate(day);
    },
    [],
  );

  useEffect(() => {
    async function appointmentsFind() {
      const response = await api.get<Appointment[]>(
        `/appointments/me?day=${selectDate.getDate()}&month=${
          selectDate.getMonth() + 1
        }&year=${selectDate.getFullYear()}`,
      );
      const appointmentAll = response.data;
      setAppointments(appointmentAll);
    }

    appointmentsFind();
  }, [selectDate, token]);

  const appointmentNext = useMemo(() => {
    const now = moment().hour(16).minute(15); // moment()
    return appointments.find(appointment => {
      const date = moment(appointment.date);
      return date.isSame(now) && date > now;
    });
  }, [appointments]);

  const appointmentMorning = useMemo(() => {
    return appointments.filter(
      appointment => moment(appointment.date).hour() < 12,
    );
  }, [appointments]);

  const appointmentEvening = useMemo(() => {
    return appointments.filter(
      appointment => moment(appointment.date).hour() >= 12,
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            {user.avatar_url ? (
              // <img src={user.avatar_url} alt="GoBarber" />
              <Avatar avatarUrl={user.avatar_url} />
            ) : (
              <FiUser />
            )}
            <div>
              <span>Bem-vindo,</span>
              <Link to="Profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={SignOut} title="Sair">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          {/* {console.log('appointments', appointments)}
          {console.log('appointmentNext', appointmentNext)}
          {console.log('appointmentMorning', appointmentMorning)}
          {console.log('appointmentEvening', appointmentEvening)} */}

          <h1>Horários agendados</h1>
          <p>{moment(selectDate).format('dddd, DD [de] MMMM [de] YYYY')}</p>
          {!!appointments.length ? (
            <div>
              {!!appointmentNext && (
                <>
                  <span>Atendendimento a seguir</span>

                  <AppointmentNext>
                    {appointmentNext.user.avatar_url ? (
                      <Avatar avatarUrl={appointmentNext.user.avatar_url} />
                    ) : (
                      <FiUser />
                    )}

                    <strong>{appointmentNext.user.name}</strong>
                    <div>
                      <FiClock />
                      <span>
                        {moment(appointmentNext.date).format('HH:mm')}
                      </span>
                    </div>
                  </AppointmentNext>
                </>
              )}

              <AppointmentsDay>
                <span>Manhã</span>
                <hr />

                {!!appointmentMorning.length &&
                  appointmentMorning.map(appointment => (
                    <div key={appointment.id}>
                      <FiClock />
                      <span>{moment(appointment.date).format('HH:mm')}</span>
                      <div>
                        {appointment.user.avatar_url ? (
                          <Avatar avatarUrl={appointment.user.avatar_url} />
                        ) : (
                          <FiUser />
                        )}
                        <span>{appointment.user.name}</span>
                      </div>
                    </div>
                  ))}
                <span>Tarde</span>
                <hr />
                {!!appointmentEvening.length &&
                  appointmentEvening.map(appointment => (
                    <div key={appointment.id}>
                      <FiClock />
                      <span>{moment(appointment.date).format('HH:mm')}</span>
                      <div>
                        {appointment.user.avatar_url ? (
                          <Avatar avatarUrl={appointment.user.avatar_url} />
                        ) : (
                          <FiUser />
                        )}
                        <span>{appointment.user.name}</span>
                      </div>
                    </div>
                  ))}
              </AppointmentsDay>
            </div>
          ) : (
            <NotAppointment>{'Sem Agendamento :('} </NotAppointment>
          )}
        </Schedule>
        <Calendar>
          <DayPicker
            localeUtils={MomentLocaleUtils}
            locale={moment.locale('br')}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            disabledDays={[{ daysOfWeek: [0] }, ...disabledMonthDays]}
            selectedDays={selectDate}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
