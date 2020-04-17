import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';

const accountDialogDetail = props =>{
  const {
    Transition,
    openDetail,
    onSubmitDetail,
    onCloseCustomerModal,
    dataSourceAccount
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
            MODIFICAR DETALLE COMERCIO
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
                    id='displayName'
                    label='Nombre del comercio'
                    type='name'
                    fullWidth
                    validators={['required']}
                    defaultValue={dataSourceAccount.displayName}
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='commercialName'
                    label='Nombre Comercial'
                    defaultValue={dataSourceAccount.commercialName}
                    type='commercialName'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='rtn'
                    label='RTN'
                    defaultValue={dataSourceAccount.rtn}
                    type='rtn'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='email'
                    label='Email'
                    type='email'
                    defaultValue={dataSourceAccount.email}
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='phoneNumber'
                    label='Telefono principal'
                    defaultValue={dataSourceAccount.phoneNumber}
                    type='phoneNumber'
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
                    defaultValue={dataSourceAccount.address}
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    margin='dense'
                    id='url'
                    label='URL'
                    defaultValue={dataSourceAccount.url}
                    type='url'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    margin='dense'
                    id='legalContact'
                    label='Contacto Legal'
                    defaultValue={dataSourceAccount.legalContact}
                    type='legalContact'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    margin='dense'
                    id='rtnContact'
                    label='Id Contacto Legal'
                    defaultValue={dataSourceAccount.rtnContact}
                    type='rtnContact'
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
                    MODIFICAR DETALLES
                  </Button>
                </div>
                <div style={{ padding: 10, float: 'right' }}>
                  <Button
                    onClick={onCloseCustomerModal}
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

export default withStyles(withStyles)(accountDialogDetail);
