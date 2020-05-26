import React from 'react';

import Routes from './routes';
import GlobalCss from './styles/global';
import Context from './context';

const App: React.FC = () => (
  <>
    <Context>
      <Routes />
    </Context>
    <GlobalCss />
  </>
);
export default App;
