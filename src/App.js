import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import Register from './components/Register';

import Loader from './components/Loader';

import fire from './fire';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotVerified from './components/NotVerified';

import UsersRoutes from './users/index';

function App() {
  const [values, setValues] = React.useState({
    loading: true,
    userState: 'unauthenticated',
    user: null,
  });

  React.useEffect(() => {
    fire.auth.onAuthStateChanged(function (user) {
      let tmp = {};
      if (user) {
        if (user.emailVerified) {
          tmp.userState = 'authenticated';
          fire.firestore
            .collection('/users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                tmp.user = doc.data();
              } else {
                tmp.userState = 'user does not exists in database';
              }
            });
        } else {
          tmp.userState = 'notverified';
        }
      } else {
        tmp.userState = 'unauthenticated';
      }
      setValues((state) => ({
        ...state,
        ...tmp,
        loading: false,
      }));
    });
    return () => {};
  }, []);

  if (values.loading) {
    return <Loader hideText />;
  }

  if (values.userState === 'authenticated') {
    return <UsersRoutes user={values.user} />;
  } else if (values.userState === 'notverified') {
    return (
      <>
        <CssBaseline />
        <NotVerified />
      </>
    );
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
      <Route path='/resetpassword'>
          <PasswordReset />
        </Route>
      <Route path='/register'>
          <Register />
        </Route>
        <Route path='*'>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
