import React from 'react';
import {
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import image404 from './../assets/404.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  textCenter: {
    textAlign: 'center',
  },
  paddingTop: {
    paddingTop: 10,
  },
  btn: {
    marginTop: 20,
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#3f51b5',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
  },
});

const Page404 = () => {
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs' className={classes.textCenter}>
      <Grid container>
        <Grid item xs={12} className={classes.textCenter}>
          <img src={image404} width={200} alt=''></img>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>404 - ERROR</Typography>
        </Grid>
        <Grid item xs={12} className={classes.paddingTop}>
          <Link to='/' className={classes.btn}>
            Homepage
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page404;
