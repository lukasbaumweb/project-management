import React from 'react';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateTaskDialog from './CreateTaskDialog';
import fire from '../../fire';

const BoardHeader = ({ boardId, boardName, columns, taskCounter }) => {
  const [values, setValues] = React.useState({ open: false, taskTitle: null });

  const handleClickOpen = () => {
    setValues({ ...values, open: true });
  };

  const generateIdWithSentence = (sentence, counter) => {
    let splittedMessage = sentence.split(' ');
    if (splittedMessage.length < 3) {
      splittedMessage = [
        sentence.charAt(0),
        sentence.charAt(1),
        sentence.charAt(2),
      ];
    }
    if (counter === undefined) counter = 1;
    else counter++;
    return (
      splittedMessage
        .map((str) => {
          return str.charAt(0);
        })
        .join('') +
      '-' +
      counter
    );
  };

  const saveTask = async (data) => {
    console.log(data);
    const columnIndex = columns.findIndex(
      (column) => column.name === data.type
    );
    const newTask = {
      id: generateIdWithSentence(boardName, taskCounter),
      title: data.title,
      description: data.description,
      type: data.type,
      createdAt: new Date(),
    };
    await fire.database
      .ref(`boards/${boardId}/columns/${columnIndex}`)
      .transaction((column) => {
        if (column) {
          if (typeof column.tasks === 'object') {
            column.tasks.push(newTask);
          } else {
            column.tasks = [newTask];
          }
        }
        return column;
      });
    await fire.database.ref(`boards/${boardId}/board/`).transaction((board) => {
      if (board) {
        if (typeof board.taskCounter === 'number') {
          board.taskCounter += 1;
        } else {
          board.taskCounter = 1;
        }
      }
      return board;
    });
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Typography component='h1' variant='h4'>
        {boardName}
      </Typography>
      <Button
        aria-label='Add'
        color='primary'
        variant='contained'
        onClick={handleClickOpen}
        startIcon={<AddIcon />}>
        Neue Story
      </Button>
      {values.open ? (
        <CreateTaskDialog
          onSaveForm={saveTask}
          columns={columns}
          taskCounter={taskCounter}
          handleClose={() => setValues({ ...values, open: false })}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BoardHeader;
