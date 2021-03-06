import React from 'react';
import {
  RouteProps as AuxRouteProps,
  Route as AuxRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends AuxRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth();

  return (
    <AuxRoute
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/Dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
