import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/ForgetPassword" component={ForgetPassword} />
      <Route path="/ResetPassword" component={ResetPassword} />

      <Route path="/Dashboard" component={Dashboard} isPrivate />
    </Switch>
  </BrowserRouter>
);

export default Routes;
