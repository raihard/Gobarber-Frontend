import React, { useCallback } from 'react';
import { FiXCircle, FiAlertTriangle, FiInfo, FiCheck } from 'react-icons/fi';

import { useTransition } from 'react-spring';

import { Container, ToastItem } from './styles';
import { ToastMessage, useToast } from '../../context/ToastContext';
import { setTimeout } from 'timers';

interface ToastMessageData {
  messages: ToastMessage[];
}

const typeToast = {
  info: <FiInfo size={30} />,
  sucess: <FiCheck size={30} />,
  error: <FiAlertTriangle size={30} />,
};

const Toast: React.FC<ToastMessageData> = ({ messages }) => {
  const { removeToasd } = useToast();
  const toastTransition = useTransition(messages, massage => massage.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  const autoRemoveToast = useCallback(
    (id: string): void => {
      setTimeout(() => removeToasd(id), 3000);
    },
    [removeToasd],
  );

  return (
    <Container>
      {toastTransition.map(({ item, key, props }) => (
        <ToastItem key={key} type={item.type} style={props}>
          {typeToast[item.type]}
          <div>
            <strong>{item.title}</strong>
            <p>{item.Description}</p>
          </div>
          {autoRemoveToast(item.id)}
          <button onClick={() => removeToasd(item.id)}>
            <FiXCircle size={16} />
          </button>
        </ToastItem>
      ))}
    </Container>
  );
};

export default Toast;
