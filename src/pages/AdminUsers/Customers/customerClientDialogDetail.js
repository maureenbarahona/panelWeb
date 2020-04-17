import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';

const customerClientDialogDetail = props =>{
  const {
    Transition,
    openDetail,
    onSubmitDetail,
    onCloseModal,
    dataSource
  } = props;
  return (
    <div style={{ flexGrow: 1 }}>
      <Dialog
        open={openDetail}
        aria-labelledby='alert-dialog-title'
        TransitionComponent={Transition}
        fullWidth='fullWidth'
        maxWidth='md'
        scroll='paper'
        style={{ width: '90%', height: '100%', margin: 'auto' }}
      >
        <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
          <span style={{ color: '#F8931D', padding: 10 }}>
          MODIFICAR CLIENTE
          </span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {openDetail && (
            <form onSubmit={onSubmitDetail}>
              <div style={{ padding: 10 }}>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    autoFocus
                    required
                    margin='dense'
                    id='email'
                    label='Email'
                    type='name'
                    fullWidth
                    validators={['required']}
                    defaultValue={dataSource.email}
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='firstName'
                    label='Nombres'
                    defaultValue={dataSource.firstName}
                    type='firstName'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='lastName'
                    label='Apellidos'
                    defaultValue={dataSource.lastName}
                    type='lastName'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='address'
                    label='Direccion'
                    type='address'
                    defaultValue={dataSource.address}
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='mobileNumber'
                    label='Telefono'
                    defaultValue={dataSource.mobileNumber}
                    type='mobileNumber'
                    fullWidth
                  />
                </div>               
              </div>
              <div
                style={{
                  flexGrow: 1,
                  marginTop: 15
                }}
              >
                <div style={{ padding: 10, float: 'right' }}>
                  <Button type='submit' color='primary' variant='contained'>
                    MODIFICAR
                  </Button>
                </div>
                <div style={{ padding: 10, float: 'right' }}>
                  <Button
                    onClick={onCloseModal}
                    color='gray'
                    variant='contained'
                  >
                    CANCELAR
                  </Button>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(withStyles)(customerClientDialogDetail);
