import React from 'react';
import { BrowerRouter, Switch, Route } from 'react-router-dom';

const UsersRoutes = () => {
  return (
    <BrowerRouter>
      <Switch>
        <Route path='/about'></Route>
        <Route path='/users'></Route>
        <Route path='/'></Route>
      </Switch>
    </BrowerRouter>
  );
};

export default UsersRoutes;
