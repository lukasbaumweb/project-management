import React from 'react';

import {
  Container,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Fade,
} from '@material-ui/core';
import BoardList from './components/BoardList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import fire from '../fire';
import CreateBoardDialog from './components/CreateBoardDialog';

const CreateBoard = () => {
  const [values, setValues] = React.useState({
    anchorEl: null,
    openDialog: false,
  });
  const open = Boolean(values.anchorEl);

  const handleClick = (event) => {
    setValues({ ...values, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setValues({ ...values, anchorEl: null });
  };

  const createNewBoard = ({ boardName }) => {
    let newBoardKey = fire.database.ref().child('boards').push().key;
    fire.database.ref('boards/' + newBoardKey).set(
      {
        owners: fire.auth.currentUser.uid,
        boardId: newBoardKey,
        boardName,
        description: '',
        taskCounter: 0,
        columns: [
          {
            order: 1,
            name: 'Backlog',
            type: 'backlog',
          },
          { order: 2, name: 'Ideas' },
          { order: 3, name: 'In Progress' },
          { order: 4, name: 'Finished' },
          { order: 5, name: 'Archived', type: 'archive' },
        ],
        createdAt: new Date(),
      },
      (err) => {
        if (err) {
          console.log({ err });
        } else {
          console.log(err);
          setValues({ ...values, openDialog: false, open: false });
          window.location.reload();
        }
      }
    );
  };

  return (
    <Container>
      <Typography variant='h4' component='h4' style={{ float: 'left' }}>
        Boards
      </Typography>
      <IconButton
        style={{ float: 'right' }}
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='fade-menu'
        anchorEl={values.anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem
          onClick={() => {
            handleClose();
            setValues({ ...values, openDialog: true });
          }}>
          Neues Board
        </MenuItem>
      </Menu>
      <Grid container>
        <Grid item xs={12}>
          <BoardList />
        </Grid>
      </Grid>
      {values.openDialog ? (
        <CreateBoardDialog onSaveForm={createNewBoard} />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CreateBoard;
