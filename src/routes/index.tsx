import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import 'moment/locale/pt-br';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/Profile';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/ForgetPassword" component={ForgetPassword} />
      <Route path="/ResetPassword" component={ResetPassword} />

      <Route path="/Dashboard" component={Dashboard} isPrivate />
      <Route path="/Profile" component={Profile} isPrivate />
    </Switch>
  </BrowserRouter>
);

export default Routes;
