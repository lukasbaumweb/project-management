import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import AwesomeDrawer from './AwesomeDrawer';

const UsersRoutes = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AwesomeDrawer>
        <Switch>
          <Route path='*'>
            <Dashboard />
          </Route>
        </Switch>
      </AwesomeDrawer>
    </BrowserRouter>
  );
};

export default UsersRoutes;
