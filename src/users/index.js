import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import AwesomeDrawer from './AwesomeDrawer';
import Settings from './Settings';
import Board from './Board';
import CreateBoard from './CreateBoard';
import BoardSettings from './BoardSettings';

const UsersRoutes = ({ user }) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AwesomeDrawer user={user}>
        <Switch>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/boards'>
            <CreateBoard />
          </Route>
          <Route path='/board/settings/:boardId'>
            <BoardSettings />
          </Route>
          <Route path='/board/:boardId'>
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
