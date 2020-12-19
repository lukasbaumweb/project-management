import React from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/';

const CreateBoardDialog = ({ onSaveForm }) => {
  const [values, setValues] = React.useState({ open: true, boardName: '' });

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSaveForm(values);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={values.open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Board erstellen</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Erstelle jetzt dein eigenes Board um den Status deiner Aufgaben
              leichter im Blick zu behalten.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              label='Boardname'
              type='text'
              value={values.boardName}
              onChange={(e) => {
                setValues({ ...values, boardName: e.target.value });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Abbrechen
            </Button>
            <Button type='submit' color='primary'>
              Erstellen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default CreateBoardDialog;
