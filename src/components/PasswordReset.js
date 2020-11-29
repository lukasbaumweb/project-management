import React from 'react';
import {
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core/';

import Logo from './../assets/logo.svg';

import { Link as RouterLink } from 'react-router-dom';

import Copyright from './Copyright';
import AwesomeSnackbar from './../components/AwesomeSnackbar';

import fire from './../fire';
import ERROR_CODES from './../helpers/Error_Codes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    height: 100,
    width: 100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
  });

  const [error, setError] = React.useState('');

  const handleChange = (e, prop) => {
    setValues({
      ...values,
      [prop]: e.target.value,
    });
  };

  const onSubmitPasswordReset = () => {
    setError('');
  };

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            className={classes.avatar}
            src={Logo}
            alt='Project Management Logo'
          />
          <Typography component='h1' variant='h5'>
            Anmelden
          </Typography>
          <form
            className={classes.form}
            onSubmit={onSubmitPasswordReset}
            noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='E-Mail'
              autoComplete='email'
              autoFocus
              onChange={handleChange}
              value={values.email}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Anmelden
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to='/' variant='body2'>
                  Anmelden?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to='/register' variant='body2'>
                  Registrieren
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      {error !== '' ? <AwesomeSnackbar message={error} type='error' /> : <></>}
    </Grid>
  );
}
