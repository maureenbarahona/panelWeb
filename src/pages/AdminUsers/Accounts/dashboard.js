import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AccountsList from './AccountsList';
import { NavLink } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import { Redirect } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {
  getAllAccount,
  sendInfoAccount
} from '../../../actions/actionsAccounts';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const columns = [
  {
    id: 'accountName',
    numeric: false,
    disablePadding: true,
    label: 'COMERCIO'
  },
  { id: 'status', numeric: false, disablePadding: true, label: 'ESTADO' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'CREADO' },
  {
    name: 'DETALLE',
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Tooltip title='Detalle'>
            <IconButton style={{height:'50px', alignItems:'center', justifyContent:'center'}}
              onClick={event => {
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        );
      }
    }
  },
];

class Accounts extends Component {
  toastId = null;

  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  state = {
    paymentProvider:'',
    redirectToEdit: false,
    newAccount: {},
    sendInfo: false,
    loading: false,
    dataSource: [],
    error: [],
    open: false,
    infoAccounts: {
      displayName: '',
      isActive: true,
      email: '',
      balance: 0,
      commercialName: '',
      paymentProvider: '',
      phoneNumber: '',
      rtn: '',
      diaryTransactionLimit: 0,
      diaryTotalTransaction: 0,
      transactionMin: 0,
      transactionMax: 0,
      branch: 0,
      address: '',
      url: '',
      legalContact: '',
      rtnContact: '',
      contract: ''
    },
    responseSendAccount: '',
    notification: {
      open: false,
      message: '',
      variant: ''
    },
    message: '',
    dataSourceUserTable:[]
  };

   async getData() {
    this.setState({ loading: true });

    getAllAccount()
    .then(res => {
      this.setState({
        dataSource: res,
        loading: false
      });
    })
    .catch(err => {
      this.setState({
        error: err,
        submitted: false,
        sendButtonDisabled: false
      });
      this.notifyError(err);
      return;
    });
  }

  componentDidMount() {
    this.getData();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  sendInfo = async values => {
    sendInfoAccount(values)
      .then(res => {
        this.setState({
          submitted: false,
          sendButtonDisabled: false,
          redirectToEdit: true,
          newAccount: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err,
          submitted: false,
          sendButtonDisabled: false
        });
        this.notifyError(err);
        return;
      });
  };

  onValidateSendInfo = pinfoAccount => {
    if (pinfoAccount.displayName.length < 1) {
      this.notifyError('Nombre del comercio es requerido');
      return;
    }
    if (pinfoAccount.commercialName.length < 1) {
      this.notifyError('Nombre comercial es requerido');
      return;
    }
    if (pinfoAccount.email.length < 1) {
      this.notifyError('email es requerido');
      return;
    }
    if (
      pinfoAccount.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(pinfoAccount.email)
    ) {
      this.notifyError('Invalid email address');
      return;
    }
    if (pinfoAccount.paymentProvider.length < 1) {
      this.notifyError('Proveedor del pago es requerido');
      return;
    }
    if (pinfoAccount.phoneNumber.length < 1) {
      this.notifyError('Numero de telefono principal es requerido');
      return;
    }
    if (pinfoAccount.rtn.length < 1) {
      this.notifyError('rtn es requerido');
      return;
    }
    if (pinfoAccount.branch.length < 1) {
      this.notifyError('Numero de agencias es requerido');
      return;
    }
    if (pinfoAccount.diaryTotalTransaction.length < 1) {
      this.notifyError('Total de transacciones diarias es requerido');
      return;
    }
    if (pinfoAccount.transactionMin.length < 1) {
      this.notifyError('Transacciones minimas  es requerido');
      return;
    }
    if (pinfoAccount.transactionMax.length < 1) {
      this.notifyError('Transacciones maximas es requerido');
      return;
    }
    if (pinfoAccount.diaryTransactionLimit.length < 1) {
      this.notifyError('limite de transacciones diarias es requerido');
      return;
    }
    if (pinfoAccount.address.length < 1) {
      this.notifyError('direccion es requerida');
      return;
    }

    return true;
  };

  onChangeFilter = (event) =>{
    this.setState({
      paymentProvider: event.target.value
    });
  
}
  onSubmit = e => {
    e.preventDefault();
    const target = e.currentTarget;
    

    const infoAccount = {
      displayName: target.displayName.value,
      commercialName: target.commercialName.value,
      email: target.email.value,
      paymentProvider: this.state.paymentProvider,
      phoneNumber: target.phoneNumber.value,
      rtn: target.rtn.value,
      branch: parseInt(target.branch.value),
      diaryTotalTransaction: parseInt(target.diaryTotalTransaction.value),
      transactionMin: parseInt(target.transactionMin.value),
      transactionMax: parseInt(target.transactionMax.value),
      diaryTransactionLimit: parseInt(target.diaryTransactionLimit.value),
      address: target.address.value,
      url: target.url.value,
      legalContact: target.legalContact.value,
      rtnContact: target.rtnContact.value,
      contract: target.contract.value
    };

    if (this.onValidateSendInfo(infoAccount)) {
      this.sendInfo(infoAccount);
    }
  };

  render() {
    const { newAccount, open, redirectToEdit, paymentProvider } = this.state;

    if (redirectToEdit)
      return (
        <Redirect
          push
          to={{
            pathname: `/panel/accountDetail/${newAccount._id}`
          }}
        />
      );

    return (
      <div>

        <div>
          <ToastContainer />
        </div>


        <AccountsList dataSource={this.state.dataSource} columns={columns} onOpenModal={this.onOpenModal} />
       
        <div>
          <Dialog
            open={open}
            onClose={this.onCloseModal}
            aria-labelledby='form-dialog-title'
            TransitionComponent={Transition}
          >
            {' '}
            <DialogTitle id='form-dialog-title'>AGREGAR COMERCIO</DialogTitle>
            <DialogContent>
              <form onSubmit={this.onSubmit}>
                <DialogTitle
                  id='simple-dialog-title'
                  style={{
                    align: 'left'
                  }}
                >
                  Informacion general
                </DialogTitle>
                <TextField
                  autoFocus
                  required
                  margin='dense'
                  id='displayName'
                  label='Nombre del comercio'
                  type='name'
                  fullWidth
                  validators={['required']}
                  errorMessages={['El nombre del comercio es requerido']}
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
                  id='commercialName'
                  label='Nombre Comercial'
                  type='commercialName'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='phoneNumber'
                  label='Telefono principal'
                  type='phoneNumber'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='rtn'
                  label='RTN'
                  type='rtn'
                  fullWidth
                />               
                  <FormControl>
                    <Select
                      value={paymentProvider}
                      onChange={this.onChangeFilter}
                      name='paymentProvider'
                      displayEmpty
                      required
                    >
                    <MenuItem value={'CREDOMATIC'}>Credomatic</MenuItem>
                    <MenuItem value={'BANPAIS'}>Banpais</MenuItem>
                    </Select>
                    <FormHelperText>Seleccione el proveedor del pago</FormHelperText>
                  </FormControl>
                <TextField
                  required
                  margin='dense'
                  id='address'
                  label='Direccion'
                  type='address'
                  fullWidth
                />
                <DialogTitle id='simple-dialog-title'>
                  Informacion operativa
                </DialogTitle>
                <TextField
                  required
                  margin='dense'
                  id='diaryTransactionLimit'
                  label='Limite de transacciones diarias'
                  type='number'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='transactionMin'
                  label='Minimo de transacciones'
                  type='number'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='transactionMax'
                  label='Maximo de transacciones'
                  type='number'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='branch'
                  label='Sucursales'
                  type='number'
                  fullWidth
                />
                <TextField
                  required
                  margin='dense'
                  id='diaryTotalTransaction'
                  label='Total transacciones diarias'
                  type='number'
                  fullWidth
                />
                <TextField
                  margin='dense'
                  id='url'
                  label='URL'
                  type='url'
                  fullWidth
                />
                <DialogTitle
                  id='simple-dialog-title'
                  style={{
                    align: 'left'
                  }}
                >
                  Informacion contacto
                </DialogTitle>
                <TextField
                  margin='dense'
                  id='legalContact'
                  label='Contacto Legal'
                  type='legalContact'
                  fullWidth
                />
                <TextField
                  margin='dense'
                  id='rtnContact'
                  label='Id Contacto Legal'
                  type='rtnContact'
                  fullWidth
                />
                <TextField
                  margin='dense'
                  id='contract'
                  label='Contrato'
                  type='contract'
                  fullWidth
                />
                <Button onClick={this.onCloseModal} color='primary'>
                  CANCELAR
                </Button>
                <Button type='submit' color='primary'>
                  AGREGAR COMERCIO
                  <NavLink
                    exact
                    to='/panel/AccountDetail'
                    key='/panel/AccountDetail'
                  />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default Accounts;
