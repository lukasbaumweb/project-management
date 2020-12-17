import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  Typography,
} from '@material-ui/core/';

import WorkIcon from '@material-ui/icons/Work';
import fire from '../../fire';
import Loader from '../../components/Loader';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProjectList = () => {
  const [values, setValues] = React.useState({
    currentItem: null,
    limit: 10,
    loading: true,
    projects: [],
  });
  const classes = useStyles();
  const history = useHistory();

  const fetchProjectsCallback = React.useCallback(() => {
    fire.database
      .ref('/projects')
      .startAt(values.currentItem)
      .limitToFirst(values.limit)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists) {
          let data = snapshot.val();
          setValues((state) => ({
            ...state,
            projects: Object.values(data || []),
            loading: false,
          }));
        } else {
          setValues((state) => ({
            ...state,
            loading: false,
          }));
        }
      })
      .catch((err) => {
        setValues((state) => ({
          ...state,
          error: err.message,
          loading: false,
        }));
      });
  }, [values.currentItem, values.limit]);

  React.useEffect(() => {
    fetchProjectsCallback();
    return () => {};
  }, [fetchProjectsCallback]);

  if (values.loading) {
    return <Loader text='Projekte werden geladen' />;
  }
  if (values.projects?.length === 0) {
    return <Typography variant='subtitle1'>Erstelle erst ein Projekt</Typography>;
  }
  return (
    <List className={classes.root}>
      {values.projects?.map((project) => {
        return (
          <ListItem
            button
            key={project.projectId}
            onClick={() => {
              history.push(`/board/${project.projectId}`);
            }}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.projectName} secondary={project.owner} />
          </ListItem>
        );
      })}
    </List>
  );
};
export default ProjectList;
