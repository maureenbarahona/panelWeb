import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';

const accountDialogUsers = props =>{
  const { Transition, open,onUserSubmit, onCloseUserModal } = props;
    return (
      <div style={{ flexGrow: 1 }}>
        <Dialog
          open={open}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          <DialogTitle id='form-dialog-title'>AGREGAR USUARIO</DialogTitle>
          <DialogContent>
            <div>
              <br />
              <form onSubmit={onUserSubmit}>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id='name'
                  label='Nombre'
                  type='name'
                  fullWidth
                  validators={['required']}
                />
                <TextField
                  required
                  margin='dense'
                  id='email'
                  label='Email'
                  type='email'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='password'
                  label='Password'
                  type='password'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='mobileNumber'
                  label='mobileNumber'
                  type='mobileNumber'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='workPhone'
                  label='workPhone'
                  type='workPhone'
                  fullWidth
                />
                <Button onClick={onCloseUserModal} color='primary'>
                  CANCELAR
                </Button>
                <Button type='submit' color='primary'>
                  AGREGAR USUARIO
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default withStyles(withStyles)(accountDialogUsers);
