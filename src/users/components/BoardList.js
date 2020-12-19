import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
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

const BoardList = () => {
  const [values, setValues] = React.useState({
    currentItem: null,
    limit: 10,
    loading: true,
    boards: [],
    contextMenu: {
      boardId: null,
      mouseX: null,
      mouseY: null,
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const fetchBoardsCallback = React.useCallback(() => {
    fire.database
      .ref('/boards')
      .startAt(values.currentItem)
      .limitToFirst(values.limit)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists) {
          let data = snapshot.val();
          setValues((state) => ({
            ...state,
            boards: Object.values(data || []),
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
    fetchBoardsCallback();
    return () => {};
  }, [fetchBoardsCallback]);

  const handleClick = (event, boardId) => {
    event.preventDefault();
    setValues({
      ...values,
      contextMenu: {
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        boardId: boardId,
      },
    });
  };

  const handleClose = () => {
    setValues({
      ...values,
      contextMenu: {
        boardId: null,
        mouseX: null,
        mouseY: null,
      },
    });
  };

  if (values.loading) {
    return <Loader text='Boards werden geladen' />;
  }

  if (values.boards?.length === 0) {
    return <Typography variant='subtitle1'>Erstelle erst ein Board</Typography>;
  }

  return (
    <>
      <List className={classes.root}>
        {values.boards?.map((board) => {
          return (
            <ListItem
              onContextMenu={(e) => {
                handleClick(e, board.boardId);
              }}
              button
              key={board.boardId}
              onClick={() => {
                history.push(`/board/${board.boardId}`);
              }}>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={board.boardName}
                secondary={
                  board.description?.length > 0 ? board.description : ''
                }
              />
            </ListItem>
          );
        })}
      </List>
      <Menu
        keepMounted
        open={values.contextMenu.mouseY !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          values.contextMenu.mouseY !== null &&
          values.contextMenu.mouseX !== null
            ? {
                top: values.contextMenu.mouseY,
                left: values.contextMenu.mouseX,
              }
            : undefined
        }>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(`/board/settings/${values.contextMenu.boardId}`);
          }}>
          Einstellungen
        </MenuItem>
      </Menu>
    </>
  );
};
export default BoardList;
