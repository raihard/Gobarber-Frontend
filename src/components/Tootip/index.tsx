import React from 'react';

import { Container } from './styles';

interface TootipPrps {
  title: string;
  className?: string;
}

const Tootip: React.FC<TootipPrps> = ({ title, className = '', children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tootip;
