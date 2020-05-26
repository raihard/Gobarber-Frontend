import React, {
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons/';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const [isFocus, setFocus] = useState(false);
  const [isBlur, setBlur] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const InputonBlur = useCallback(() => {
    setFocus(false);
    setBlur(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container isError={!!error} isFocus={isFocus} isBlur={isBlur}>
        {Icon && <Icon size={20} />}
        <input
          onFocus={() => setFocus(true)}
          onBlur={InputonBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...props}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} color="#c20" />
          </Error>
        )}
      </Container>
    </>
  );
};
export default Input;
