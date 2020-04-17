import React from 'react';
import CardR from 'react-credit-cards';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import {withStyles} from '@material-ui/core/styles';

const customerClientDialogCards = props => {
  const {
    Transition,
    openCard,
    name,
    number,
    expiry,
    cvc,
    focused,
    handleCallback,
    handleSubmit,
    handleInputChange,
    handleInputFocus,
    handleClose,
    redirectToTarget
  } = props;
  return (
    <div style={{ flexGrow: 1 }}>
      <Dialog
        open={openCard}
        aria-labelledby='form-dialog-title'
        TransitionComponent={Transition}
      >
        <DialogTitle id='simple-dialog-title'>
        <span style={{ color: '#F8931D', padding: 10 }}>AGREGAR TARJETAS</span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div key='Payment'>
            <div className='App-payment' style={{ padding: 10 }}>
              <CardR
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
              />
              </div>
              <br />
              <form onSubmit={handleSubmit}>
                <div className='form-group' style={{ padding: 10 }}>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    autoFocus
                    margin='dense'
                    type='tel'
                    name='number'
                    value={number}
                    placeholder='Numero de Tarjeta'
                    pattern='[\d| ]{16,22}'
                    required
                    onChange={handleInputChange}
                    label='Numero de tarjeta'
                    onFocus={handleInputFocus}
                    fullWidth
                  />
                  </div>
                  <div style={{ paddingBottom: 10 }}>              
                  <TextField
                    type='text'
                    name='name'
                    margin='dense'
                    label='Nombre y Apellido'
                    fullWidth
                    placeholder='Nombre y Apellido'
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                    <TextField
                      type='tel'
                      name='expiry'
                      placeholder='Fecha de Expiracion'
                      pattern='\d\d/\d\d'
                      margin='dense'
                      label='Fecha de Expiracion'
                      fullWidth
                      required
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </div>                
              </form>          
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonModal onClick={handleClose} color='gray' style={{ padding: 10, float: 'right' }}>
            CANCELAR
          </ButtonModal>
          <ButtonModal onClick={redirectToTarget} color='primary' style={{ padding: 10, float: 'right' }}>
            AGREGAR
          </ButtonModal>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(withStyles)(customerClientDialogCards);
