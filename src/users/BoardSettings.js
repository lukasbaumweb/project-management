import React from 'react';

import { Button, Container, Typography, Grid } from '@material-ui/core';

import Loader from './../components/Loader';

import { useHistory, useParams } from 'react-router-dom';
import fire from '../fire';
import AskDialog from './dialogs/AskDialog';

const BoardSettings = () => {
  const [values, setValues] = React.useState({
    board: null,
    loading: true,
    loadingError: '',
    showDeleteDialog: false,
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
    fire.database
      .ref(`boards/${boardId}`)
      .remove()
      .then(() => {
        history.push('/boards');
      });
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

        <Grid item xs={12}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              setValues({ ...values, showDeleteDialog: true });
            }}>
            Board Löschen
          </Button>
        </Grid>
      </Grid>
      {values.showDeleteDialog ? (
        <AskDialog
          title='Board unwiderruflich löschen'
          onAgree={deleteBoard}
          onClose={() => {
            setValues({ ...values, showDeleteDialog: false });
          }}>
          <p>
            Du bist gerade dabei das Board mit dem Namen "
            {values.board.boardName}" zu löschen. Achtung! Diese Aktion kann
            nicht widerrufen werden!
          </p>
        </AskDialog>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default BoardSettings;
