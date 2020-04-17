import axios from 'axios';
import moment from 'moment';
import style from './styles';
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CustomersList from './CustomersList';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import Divider from '@material-ui/core/Divider';

import ButtonModal from '@material-ui/core/Button';
import { authHeader } from '../../../services/user';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import DialogTitle from '@material-ui/core/DialogTitle';
import Filter from '../../../components/Container/Filters';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { headers, baseURL } from '../../../services/request';
import SearchBar from '../../../components/Container/Header/SearchBar';
import Grid from '@material-ui/core/Grid';


let myStartDate;
let myEndDate;

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const columns = [
  { id: 'name', numeric: false, disablePadding: true, label: 'CLIENTE' },
  { id: 'IdCard', numeric: false, disablePadding: false, label: 'TARJETA' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'CREADO' },
  { id: 'value', numeric: false, disablePadding: false, label: 'ACCION' }
];

class Customers extends Component {
  toastId = null;

  state = {
    checkSms:false,
    checkEmail:false,
    newClient: {},
    redirectToEdit: false,
    startDate: moment().startOf('month'),
    endDate: moment().endOf('day'),
    data: [],
    dataSource: [],
    dataSourceOriginal: [],
    infoCustomersDetail: [],
    infoCustomers: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobileNumber: ''
    },
    notification: {
      open: false,
      message: '',
      variant: ''
    },

    open: false
  };

  handleCheckBox  = (id,state) => {
    this.setState({
      [id]: (state) ? false : true
    });
  };

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

  sendInfo = async values => {
    const axiosBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      address: values.address,
      mobileNumber: values.mobileNumber,
      smsNotification: this.state.checkSms,
      emailNotification: this.state.checkEmail,
    };


    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.post(
        `${baseURL}/customers`,
        axiosBody,
        axiosConfig
      );

      const { data } = response;
      this.notifySuccess('Cliente creado exitosamente');
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        redirectToEdit: true,
        open: false,
        newClient: { ...data }
      });
    } catch (error) {
      this.setState({ submitted: false, sendButtonDisabled: false });
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
    }
  };

  handleSubmit = e => {
    if (
      this.state.infoCustomers.firstName.length < 1 ||
      this.state.infoCustomers.lastName < 1 ||
      this.state.infoCustomers.email < 1 ||
      this.state.infoCustomers.address < 1 ||
      this.state.infoCustomers.mobileNumber < 1
    ) {
      if (this.state.infoCustomers.email.length < 1) {
        this.notifyError('El campo de correo esta vacio');
        return;
      }
      if (this.state.infoCustomers.firstName.length < 1) {
        this.notifyError('El campo de nombre esta vacio');
        return;
      }
      if (this.state.infoCustomers.lastName.length < 1) {
        this.notifyError('El campo de apellido esta vacio');
        return;
      }

      if (this.state.infoCustomers.address.length < 1) {
        this.notifyError('El campo de dirección esta vacio');
        return;
      }
      if (this.state.infoCustomers.mobileNumber.length < 1) {
        this.notifyError('El campo de teléfono esta vacio');
        return;
      }
    } else {
      this.sendInfo(this.state.infoCustomers);
    }
  };



  onChangeInfo = name => event => {
    const { infoCustomers } = this.state;
    infoCustomers[name] = event.target.value;
    this.setState({ infoCustomers: { ...infoCustomers } });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  filterProps = {
    disableButton: true,
    loading: this.state.loading,
    rangePickerProps: {
      defaultValue: [this.state.startDate, this.state.endDate],
      onChangeStart: event => {
        myStartDate = moment(event.target.value, 'YYYY/MM/DD').startOf('day');
        this.getData();
      },
      onChangeEnd: event => {
        myEndDate = moment(event.target.value, 'YYYY/MM/DD').endOf('day');
        this.getData();
      }
    },
    buttonProps: {
      onClick: () => {
        this.getData();
      }
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  async setData(firstName, lastName, email, address) {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const { data } = await axios.post(`${baseURL}/customers`, axiosConfig, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address
      });

      this.setState({
        infoCustomersDetail: data
      });
      return { data };
    } catch (error) {
      const { response } = error;

      let message = 'Error de conexión';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.setState({
        loading: false,
        notification: {
          message,
          open: true,
          variant: 'error'
        }
      });
    }
  }
  async getData() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    const startDate = moment(myStartDate, 'YYYY/MM/DD').unix();
    const endDate = moment(myEndDate, 'YYYY/MM/DD').unix();

    try {
      const { data } = await axios.get(
        `${baseURL}/customers?include=cards&startDate=${startDate}&endDate=${endDate}&include=issuer`,
        axiosConfig
      );
      const dataSource = data.map(customer => {
        const {
          firstName,
          lastName,
          _id,
          createdAt,
          cards = [],
          email,
          address,
          mobileNumber
        } = customer;

        var numCard = cards.length;
        var infoCard = '';
        const dataCard = cards.map(card => {
          const { safeIdentifier, paymentType } = card;
          if (numCard < 4) {
            infoCard = `${paymentType ||
              'VISA'} ${safeIdentifier}, ${numCard}+`;
          } else {
            infoCard = `${infoCard} ...`;
          }
          return infoCard;
        });

        var numCardDetail = cards.length;
        var infoCardDetail = '';
        const dataCardDetail = cards.map(card => {
          const { safeIdentifier, _id, validThru } = card;
          if (numCardDetail < 4) {
            const idCard = _id;
            infoCardDetail = `${safeIdentifier},${idCard},${validThru}`;
          } else {
            infoCardDetail = `${infoCardDetail}...`;
          }
          return infoCardDetail;
        });

        return {
          firstName,
          lastName,
          _id,
          createdAt,
          dataCard,
          email,
          address,
          mobileNumber,
          dataCardDetail
        };
      });

      this.setState({ dataSource, dataSourceOriginal: dataSource });
    } catch (error) {
      const { response } = error;

      let message = 'Error de conexión';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.setState({
        loading: false,
        notification: {
          message,
          open: true,
          variant: 'error'
        }
      });
      this.notifyError(message);
    }
  }

  componentDidMount() {
    myStartDate = moment().startOf('month');
    myEndDate = moment().endOf('day');
    this.getData();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleTabChange(activeKey) {}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = e => { 

    const value = e.target.value.toLowerCase();
    let filteredData = this.state.dataSourceOriginal;
    if (value !== '') {
      filteredData = filteredData.filter(customer =>
        customer.firstName.toLowerCase().includes(value) ||
        customer.lastName.toLowerCase().includes(value)
      );
  
      this.setState({
        dataSource: filteredData
      });
    } else
      this.setState({
        dataSource: this.state.dataSourceOriginal
      });
  };
  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }

  render() {
    const { open, redirectToEdit, newClient } = this.state;

    if (redirectToEdit)
      return (
        <Redirect
          push
          to={{
            pathname: `/panel/customers/${newClient._id}`
          }}
        />
      );

    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <SearchBar placeholder='Buscar...' onChange={this.handleChange} />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            margin: ' 0 0 -60px 0',
            width: '60%'
          }}
        >
          <Filter {...this.filterProps} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Dialog
            open={open}
            aria-labelledby='alert-dialog-title'
            TransitionComponent={Transition}
            fullWidth='fullWidth'
            maxWidth='sm'
            scroll='paper'
            style={{ width: '90%', height: '100%', margin: 'auto' }}
          >
            <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
              <span style={{ color: '#F8931D', padding: 10 }}>
                AGREGAR CLIENTE
              </span>
            </DialogTitle>
            <Divider />
            <Divider />
            <DialogContent>
              <div style={{ padding: 10 }}>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    required
                    onChange={this.onChangeInfo('email')}
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email'
                    type='email'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    onChange={this.onChangeInfo('firstName')}
                    margin='dense'
                    id='firstName'
                    label='Nombres'
                    type='firstName'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    onChange={this.onChangeInfo('lastName')}
                    margin='dense'
                    id='lastName'
                    label='Apellidos'
                    type='lastName'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    onChange={this.onChangeInfo('address')}
                    margin='dense'
                    id='address'
                    label='Direccion'
                    type='address'
                    fullWidth
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    onChange={this.onChangeInfo('mobileNumber')}
                    margin='dense'
                    id='mobileNumber'
                    label='Movil'
                    type='number'
                    fullWidth
                  />
                </div>
                <Grid style={{marginTop:'5px'}} container >
                  <Grid item xs>
                    <h4 style={{color:'gray'}}>{'RECIBIR NOTIFICACION SMS : '}
                      <input
                        id='checkSms'
                        type='checkbox'
                        onChange={()=> this.handleCheckBox('checkSms',this.state.checkSms)}
                        state={this.state.checkSms}
                      />
                    </h4>
                  </Grid>    
                  <Grid item xs>
                    <h4 style={{color:'gray'}}>{'RECIBIR NOTIFICACION POR EMAIL : '}
                      <input
                        id='checkEmail'
                        type='checkbox'
                        onChange={()=> this.handleCheckBox('checkEmail',this.state.checkEmail)}
                        state={this.state.checkEmail}
                      />
                    </h4>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <Divider />
            <Divider />
            <DialogActions>
              <div style={{ padding: 10, float: 'right' }}>
                <ButtonModal
                  onClick={this.onCloseModal}
                  color='gray'
                  variant='contained'
                >
                  CANCELAR
                </ButtonModal>
              </div>
              <div style={{ padding: 10, float: 'right' }}>
                <ButtonModal
                  onClick={this.handleSubmit}
                  color='primary'
                  variant='contained'
                >
                  AGREGAR CLIENTE
                </ButtonModal>
              </div>
            </DialogActions>
          </Dialog>
        </div>
        <CustomersList
          dataSource={this.state.dataSource}
          columns={columns}
          onOpenModal={this.onOpenModal}
        />
      </div>
    );
  }
}

Customers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Customers);
