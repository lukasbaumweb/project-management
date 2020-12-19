import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import SearchIcon from '@material-ui/icons/Search';
import {
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Fade,
  Typography,
} from '@material-ui/core/';

import fire from './../fire';
import { useHistory, useParams } from 'react-router-dom';
import BoardHeader from './components/BoardHeader';
import Loader from '../components/Loader';

const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.tasks.splice(startIndex, 1);
  result.tasks.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = source;
  const destClone = destination;

  const [removed] = sourceClone.tasks.splice(droppableSource.index, 1);

  if (destClone.tasks === undefined) destClone.tasks = [];

  destClone.tasks.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  borderColor: isDragging ? '#dee1e3' : '#ffffff',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  borderColor: isDraggingOver ? '#dee1e3' : '#F1F3F5',
  borderWidth: '1px',
  borderStyle: 'solid',
  background: '#F1F3F5',
  padding: '0 4px',
  width: 250,
  borderRadius: 6,
  marginRight: 10,
  minHeight: 50,
});

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    padding: '2px 4px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%',
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '12ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
  iconButton: {
    padding: 10,
  },

  item: {
    userSelect: 'none',
    padding: 10,
    margin: '10px 0',

    borderStyle: 'solid',
    borderWidth: '0.4px',

    borderRadius: 6,
    background: '#ffffff',
    borderColor: '#ffffff',
  },
  itemTitle: {
    margin: 0,
  },
  itemLabels: {
    margin: 0,
    marginBottom: 5,
  },
  label: {
    width: 'auto',
    padding: 3,
    borderRadius: 6,
    fontSize: 10,
    color: '#ffffff',
  },
  itemProfile: {},
  itemBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
    fontSize: 11,
  },
  itemUrl: {
    borderRadius: '50%',
    marginLeft: 5,
  },
}));

const Board = () => {
  const classes = useStyles();
  const history = useHistory();
  const { boardId } = useParams();

  const [values, setValues] = useState({
    loading: true,
    board: null,
    error: '',
    showBacklog: false,
    showArchived: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    let newState;
    if (sInd === dInd) {
      const items = reorder(
        values.board.columns[sInd],
        source.index,
        destination.index
      );
      newState = [...values.board.columns];
      newState[sInd] = items;
    } else {
      const result = move(
        values.board.columns[sInd],
        values.board.columns[dInd],
        source,
        destination
      );
      newState = [...values.board.columns];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
    }
    if ({ ...values, columns: newState } !== values) {
      fire.database
        .ref(`boards/${boardId}/columns/`)
        .transaction((columns) => {
          if (columns) {
            columns = newState;
          }
          return columns;
        })
        .then(() => {
          setValues({ ...values, columns: newState });
        });
    }
  }

  const onSubmitSearch = (e) => {
    e.preventDefault();
  };

  

  React.useEffect(() => {
    console.log(boardId);
    const listener = fire.database
      .ref(`boards/${boardId}`)
      .on('value', (snapshot) => {
        if (snapshot.exists) {
          const board = snapshot.val();
          if (board) {
            console.log(board);
            setValues((state) => ({
              ...state,
              board,
              loading: false,
            }));
          } else {
            setValues((state) => ({
              ...state,
              error: 'Das Board existiert nicht',
              loading: false,
            }));
          }
        }
      });
    return () => {
      fire.database.ref(`boards/${boardId}`).off('value', listener);
    };
  }, [boardId]);

  if (values.loading) {
    return <Loader text='Board wird geladen' />;
  }

  if (values.error !== '') {
    return <p>{values.error}</p>;
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={8}>
          <BoardHeader
            boardId={boardId}
            boardName={values.board.boardName}
            columns={values.board?.columns}
            taskCounter={values.board?.taskCounter}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Paper
              component='form'
              className={classes.searchWrapper}
              onSubmit={onSubmitSearch}>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
                placeholder='Search tasks'
                inputProps={{ 'aria-label': 'search tasks' }}
              />
              <IconButton
                type='submit'
                className={classes.iconButton}
                aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
            <IconButton
              aria-controls='fade-menu'
              aria-haspopup='true'
              onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id='fade-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValues({ ...values, showBacklog: !values.showBacklog });
                }}>
                Backlog {values.showBacklog ? ' verstecken' : ' anzeigen'}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setValues({ ...values, showArchived: !values.showArchived });
                }}>
                Archiv {values.showArchived ? ' verstecken' : ' anzeigen'}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push(`/board/settings/${boardId}`);
                }}>
                Einstellungen
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>

      <div style={{ display: 'flex', marginTop: 15 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {values.board?.columns.map((column, ind) => {
            if (
              (column.type === 'backlog' && !values.showBacklog) ||
              (column.type === 'archive' && !values.showArchived)
            ) {
              return null;
            }
            return (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div>
                    <Typography variant='subtitle1'>{column.name}</Typography>
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}>
                      {column.tasks?.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                          className={classes.item}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}>
                              <div className={classes.item}>
                                <h3 className={classes.itemTitle}>
                                  {item.title}
                                </h3>
                                <p className={classes.itemLabels}>
                                  {item?.labels?.map((l, i) => {
                                    return (
                                      <span
                                        key={l.name + i}
                                        className={classes.label}
                                        style={{ backgroundColor: l.color }}>
                                        {l.name}
                                      </span>
                                    );
                                  })}
                                </p>
                                <p className={classes.itemBottom}>
                                  <span>{item.id}</span>
                                  <img
                                    className={classes.itemUrl}
                                    src={item.assignee?.photoUrl}
                                    alt={item.assignee?.displayName}
                                  />
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
