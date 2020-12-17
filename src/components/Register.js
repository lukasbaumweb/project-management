import React from 'react';

import {
  makeStyles,
  Container,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import AwesomeSnackbar from './../components/AwesomeSnackbar';
import Copyright from './Copyright';
import Logo from './../assets/logo.svg';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import fire from './../fire';
import firebase from 'firebase/app';
import ERROR_CODES from './../helpers/Error_Codes';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    error: '',
  });
  const history = useHistory();

  const handleChange = (event, prop) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    fire.auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(({ user }) => {
        user.sendEmailVerification().then(function () {
          fire.firestore.collection('/users').doc(user.uid).set({
            firstName: values.fName,
            lastName: values.lName,
            email: values.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          history.push('/notverified');
        });
      })
      .catch((err) => {
        if (ERROR_CODES[err.code] !== undefined) {
          setValues({ ...values, error: ERROR_CODES[err.code] });
        } else {
          setValues({ ...values, error: err.message });
        }
        console.error(err);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <img
          className={classes.avatar}
          src={Logo}
          alt='Project Management Logo'
        />
        <Typography component='h1' variant='h5'>
          Registrieren
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                variant='outlined'
                required
                fullWidth
                label='Vorname'
                autoFocus
                onChange={(e) => handleChange(e, 'fName')}
                values={values.fName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Nachname'
                autoComplete='lname'
                onChange={(e) => handleChange(e, 'lName')}
                values={values.lName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='E-Mail'
                type='email'
                autoComplete='email'
                onChange={(e) => handleChange(e, 'email')}
                values={values.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'>
                <InputLabel htmlFor='password'>Passwort</InputLabel>
                <OutlinedInput
                  id='password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={(e) => handleChange(e, 'password')}
                  autoComplete='current-password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Zeige/Verstecke Passwort'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Registrieren
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/' component={RouterLink} variant='body2'>
                Anmelden
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {values.error !== '' ? (
        <AwesomeSnackbar message={values.error} type='error' />
      ) : (
        <></>
      )}
    </Container>
  );
}
