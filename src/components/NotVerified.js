import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core/';

import Logo from './../assets/logo.svg';

import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random/1900x800)',
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

  return (
    <Grid container component='main' className={classes.root}>
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
          <Typography component='p' variant='subtitle1'>
            Deine E-Mail wurde noch nicht von dir bestätigt. Bitte bestätige
            deine E-Mail indem du den Link aus der E-Mail folgst.
          </Typography>
          <Button
            color='primary'
            variant='contained'
            onClick={() => window.location.reload()}>
            Neuladen
          </Button>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
