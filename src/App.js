import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './components/Login';
import Loader from './components/Loader';

import fire from './fire';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotVerified from './components/NotVerified';
import UsersRoutes from './users/index';

function App() {
  const [userState, setUserState] = React.useState('unauthenticated');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fire.auth.onAuthStateChanged(function (user) {
      if (user) {
        if (user.emailVerified) {
          setUserState('authenticated');
        } else {
          setUserState('notverified');
        }
      } else {
        setUserState('unauthenticated');
      }
      setLoading(false);
    });
    return () => {};
  }, []);

  if (userState === 'authenticated') {
    return <UsersRoutes />;
  } else if (userState === 'notverified') {
    return (
      <>
        <CssBaseline />
        <NotVerified />
      </>
    );
  }

  if (loading) {
    return <Loader hideText />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path='*'>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
