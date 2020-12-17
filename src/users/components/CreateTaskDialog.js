import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  makeStyles,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 10,
  },
}));

const CreateTaskDialog = ({ onSaveForm, columns, handleClose }) => {
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    type: 'Backlog',
    disabled: false,
  });
  const classes = useStyles();

  const createTask = async (e) => {
    if (e) e.preventDefault();
    setValues({ ...values, disabled: true });
    await onSaveForm(values);
    setValues({ ...values, disabled: false });
  };

  return (
    <div>
      <Dialog
        maxWidth='lg'
        fullWidth={true}
        open={true}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <form onSubmit={createTask}>
          <DialogTitle id='form-dialog-title'>Task erstellen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>

            <TextField
              autoFocus
              margin='dense'
              label='Titel'
              type='text'
              fullWidth
              variant='filled'
              required
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              value={values.title}
              className={classes.formControl}
            />
            <TextField
              label='Beschreibung'
              multiline
              rows={3}
              fullWidth
              variant='filled'
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              value={values.description}
              className={classes.formControl}
            />
            <FormControl
              variant='filled'
              className={classes.formControl}
              fullWidth>
              <InputLabel id='select-task-type'>Type</InputLabel>
              <Select
                labelId='select-task-type'
                fullWidth
                value={values.type}
                onChange={(e) =>
                  setValues({ ...values, type: e.target.value })
                }>
                {columns
                  ?.sort((a, b) => {
                    return a.order - b.order;
                  })
                  .map((column, index) => {
                    return (
                      <MenuItem key={index} value={column.name}>
                        {column.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Abbrechen
            </Button>
            <Button disabled={values.disabled} type='submit' color='primary'>
              Erstellen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateTaskDialog;
