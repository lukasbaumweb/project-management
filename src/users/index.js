import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import AwesomeDrawer from './AwesomeDrawer';
import Settings from './Settings';
import Board from './Board';

const UsersRoutes = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AwesomeDrawer>
        <Switch>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/board'>
            <Board />
          </Route>
          <Route path='*'>
            <Dashboard />
          </Route>
        </Switch>
      </AwesomeDrawer>
    </BrowserRouter>
  );
};

export default UsersRoutes;
