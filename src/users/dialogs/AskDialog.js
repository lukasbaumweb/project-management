import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core/';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AskDialog = (props) => {
  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color='primary'>
            Abbrechen
          </Button>
          <Button onClick={props.onAgree} color='primary'>
            {props.AgreeText ? props.AgreeText : 'Akzeptieren'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AskDialog;
