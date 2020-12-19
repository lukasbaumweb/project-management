import React from 'react';

import { Container, Typography, Grid } from '@material-ui/core';

import Loader from './../components/Loader';

import { useHistory, useParams } from 'react-router-dom';
import fire from '../fire';

const BoardSettings = () => {
  const [values, setValues] = React.useState({
    board: null,
    loading: true,
    loadingError: '',
  });
  const { boardId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    fire.database
      .ref(`boards/${boardId}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const board = snapshot.val();
          setValues((state) => ({
            ...state,
            loading: false,
            board,
          }));
        } else {
          setValues((state) => ({
            ...state,
            loading: false,
            loadingError: 'Das Board existiert nicht',
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [boardId]);

  const deleteBoard = () => {
    if (window.confirm('Board wirklich löschen?')) {
      fire.database
        .ref(`boards/${boardId}`)
        .remove()
        .then(() => {
          history.push('/boards');
        });
    }
  };

  if (values.loading) {
    return <Loader hideText />;
  }

  if (values.loadingError !== '') {
    return <p>{values.loadingError}</p>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h4' component='h1'>
            Einstellungen
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography variant='h4' component='h1'>
            {values.board.boardName}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardSettings;
