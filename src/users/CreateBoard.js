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
import ProjectList from './components/ProjectList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import fire from '../fire';
import CreateProjectDialog from './components/CreateProjectDialog';

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

  const createNewProject = ({ projectName }) => {
    let newProjectKey = fire.database.ref().child('projects').push().key;
    fire.database.ref('projects/' + newProjectKey).set(
      {
        owner: fire.auth.currentUser.uid,
        projectId: newProjectKey,
        projectName,
        board: {
          taskCounter: 0,
          columns: [
            {
              order: 1,
              name: 'Backlog',
              isHidden: true,
            },
            { order: 2, name: 'Ideas' },
            { order: 3, name: 'In Progress' },
            { order: 4, name: 'Finished' },
            { order: 5, name: 'Archived', isHidden: true },
          ],
        },
      },
      (err) => {
        if (err) {
          console.log({ err });
        } else {
          console.log(err);
          setValues({ ...values, openDialog: false, open: false });
        }
      }
    );
  };

  return (
    <Container>
      <Typography variant='h4' component='h4' style={{ float: 'left' }}>
        Projekte
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
          Neues Projekt
        </MenuItem>
      </Menu>
      <Grid container>
        <Grid item xs={12}>
          <ProjectList />
        </Grid>
      </Grid>
      {values.openDialog ? (
        <CreateProjectDialog onSaveForm={createNewProject} />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CreateBoard;
