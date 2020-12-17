import { makeStyles, Typography, CircularProgress } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  spinner: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

const Loader = ({ text, hideText }) => {
  const classes = useStyles();
  let t = 'Laden...';
  if (text) {
    t = text;
  }
  if (hideText) {
    t = '';
  }

  return (
    <div className={classes.loader}>
      <CircularProgress className={classes.spinner} />
      <Typography component='h1' variant='h5'>
        {t}
      </Typography>
    </div>
  );
};
export default Loader;
