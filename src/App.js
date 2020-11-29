import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './components/Login';

import fire from './fire';

function App() {
  const [userState, setUserState] = React.useState('unauthenticated');
  React.useEffect(() => {
    fire.auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserState('authenticated');
      } else {
        setUserState('unauthenticated');
      }
    });
    return () => {};
  }, []);

  if (userState === 'unauthenticated') {
    return <Login />;
  }

  return (
    <div>
      <CssBaseline />
    </div>
  );
}

export default App;
