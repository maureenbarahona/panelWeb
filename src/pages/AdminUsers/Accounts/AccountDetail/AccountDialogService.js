import React from 'react';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const accountDialogService = props =>{
  const {
    Transition,
    openServices,
    onSubmitServices,
    onCloseCustomerModalService,
    dataSourceAccount,
    onChangeFilter
  } = props;
  return (
      <div style={{ flexGrow: 1 }}>
      <Dialog
        open={openServices}
        aria-labelledby='alert-dialog-title'
        TransitionComponent={Transition}
        fullWidth='fullWidth'
        maxWidth='md'
        scroll='paper'
        style={{ width: '90%', height: '100%', margin: 'auto' }}
      >
        <DialogTitle id='form-dialog-title2' style={{ color: 'white' }}>
          <span style={{ color: '#F8931D', padding: 10 }}>
            MODIFICAR SERVICIOS DEL COMERCIO
          </span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {openServices && (
            <form onSubmit={onSubmitServices}>
              <div style={{ padding: 10 }}>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='diaryTransactionLimit'
                    defaultValue={dataSourceAccount.diaryTransactionLimit}
                    label='Limite de transacciones diarias'
                    type='number'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='transactionMin'
                    label='Minimo de transacciones'
                    type='number'
                    defaultValue={dataSourceAccount.transactionMin}
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='transactionMax'
                    label='Maximo de transacciones'
                    defaultValue={dataSourceAccount.transactionMax}
                    type='number'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='branch'
                    label='Sucursales'
                    defaultValue={dataSourceAccount.branch}
                    type='number'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    margin='dense'
                    id='diaryTotalTransaction'
                    defaultValue={dataSourceAccount.diaryTotalTransaction}
                    label='Total transacciones diarias'
                    type='number'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <FormControl>
                    <Select
                      id='paymentProvider'
                      value={dataSourceAccount.paymentProvider}
                      onChange={onChangeFilter}
                      defaultValue={dataSourceAccount.paymentProvider}
                      required
                    >
                      <MenuItem value={'CREDOMATIC'}>
                        Credomatic
                      </MenuItem>
                      <MenuItem value={'BANPAIS'}>Banpais</MenuItem>
                    </Select>
                    <FormHelperText>
                      Seleccione el proveedor del pago
                    </FormHelperText>
                  </FormControl>
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    margin='dense'
                    id='contract'
                    label='Contrato'
                    type='contract'
                    defaultValue={dataSourceAccount.contract}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    marginTop: 15
                  }}
                >
                  <div style={{ padding: 10, float: 'right' }}>
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                    >
                      MODIFICAR SERVICIOS
                    </Button>
                  </div>
                  <div style={{ padding: 10, float: 'right' }}>
                    <Button
                      onClick={onCloseCustomerModalService}
                      color='gray'
                      variant='contained'
                    >
                      CANCELAR
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
      );
}

export default withStyles(withStyles)(accountDialogService);
