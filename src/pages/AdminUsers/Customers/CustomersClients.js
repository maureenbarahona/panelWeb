import './botones.css';
import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import styles from './customersClients.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-credit-cards/es/styles-compiled.css';
import { authHeader } from '../../../services/user';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import CustomerClientsCardHeader from './CustomerClientsCardHeader';
import CustomerClientsCardDetail from './customerClientsCardDetail';
import CustomerClientDialogDetail from './customerClientDialogDetail';
import CustomerClientDialogCards from './customerClientDialogCards';
import CustomerClientCardCards from './customerClientCardCards';
import { headers, baseURL } from '../../../services/request';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utilsCard';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class CustomersClients extends React.Component {
  toastId = null;
  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 9000
    });
  };
  constructor(props) {
    super(props);
    this.id_c = '';

    this.state = {
      errorTrace: '',
      totalCard: 0,
      dataSourceTable: {},
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobileNumber: '',

      infoCards: {
        _id: '',
        firstName: '',
        lastName: '',
        safeIdentifier: '',
        validThru: ''
      },
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      formData: null,
      infoCustomers: {}
    };
  }

  sendCard = async values => {
    const axiosBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      safeIdentifier: values.safeIdentifier,
      validThru: values.validThru
    };

    const { _id } = this.state.infoCustomers;
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.post(
        `${baseURL}/customers/${_id}/cards`,
        axiosBody,
        axiosConfig
      );
      const { data } = response;
      this.notifySuccess('Tarjeta creada exitosamente');
      this.getData();
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        openCard: false,
        newCard: { ...data },
        number: ''
      });
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        errorTrace: message
      });
    }
  };

  async getData() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    const { id } = this.props.match.params;
    try {
      const { data } = await axios.get(
        `${baseURL}/customers/${id}?include=cards`,
        axiosConfig
      );
      this.setState({
        infoCustomers: { ...data },
        dataSourceTable: data
      });
    } catch (error) {
      const { response } = error;

      let message = 'Error de conexi�n';
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
    this.getData();
  }

  updateCustomer = async values => {
    const { _id } = this.state.infoCustomers;
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      const response = await axios.put(
        `${baseURL}/customers/${_id}`,
        values,
        axiosConfig
      );
      const { data } = response;
      this.notifySuccess('Cliente modificado con exito');
      this.setState({
        data: data,
        submitted: false,
        openDetail: false,
        sendButtonDisabled: false,
        reload: true
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

  refreshTable = () => {
    this.getData();
  };

  handleClickOpen = () => {
    this.setState({ openCard: true });
  };

  handleClose = () => {
    this.setState({ openCard: false, number: '', name: '', expiry: '' });
  };

  onOpenModalCustomer = () => {
    const { infoCustomers } = this.state;
    this.setState({
      firstName: infoCustomers.firstName,
      lastName: infoCustomers.lastName,
      email: infoCustomers.email,
      address: infoCustomers.address,
      mobileNumber: infoCustomers.mobileNumber,
      openDetail: true
    });
  };

  onCloseModal = () => {
    this.setState({ openDetail: false });
  };

  onValidateSendInfoDetail = pinfoUserAccount => {
    if (pinfoUserAccount.firstName.length < 1) {
      this.notifyError('El campo de nombre esta vacio');
      return;
    }
    if (pinfoUserAccount.lastName.length < 1) {
      this.notifyError('El campo de apellido esta vacio');
      return;
    }
    if (pinfoUserAccount.email.length < 1) {
      this.notifyError('El campo de correo esta vacio');
      return;
    }
    if (pinfoUserAccount.address.length < 1) {
      this.notifyError('El campo de direccion esta vacio');
      return;
    }
    if (
      pinfoUserAccount.mobileNumber.length < 1 ||
      typeof mobileNumber === 'undefined'
    ) {
      this.notifyError('El campo de telefono esta vacio');
      return;
    }
    return true;
  };

  onSubmitDetail = e => {
    e.preventDefault();
    const target = e.currentTarget;

    const infoCustomers = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      address: target.address.value,
      mobileNumber: target.mobileNumber.value
    };

    if (this.onValidateSendInfoDetail(infoCustomers)) {
      this.updateCustomer(infoCustomers);
    }
  };

  redirectToTarget = () => {
    const { number, name, expiry } = this.state;

    let customerCardName = name,
      separator = ' ',
      limit = 2,
      arrayCardName = customerCardName.split(separator, limit);
    let firstName = arrayCardName[0];

    if (typeof arrayCardName[2] === 'undefined') {
      arrayCardName[2] = '';
    }
    let lastName = `${arrayCardName[1]} ${arrayCardName[2]}`;

    if (number.length < 15 || name.length < 1 || expiry < 1) {
      if (number.length < 15) {
        const mensaje =
          'El numero de tarjeta debe tener un minimo de 15 digitos';
        this.notifyError(mensaje);
        return;
      }

      if (number.length < 1) {
        const mensaje = 'El campo de tarjeta no puede ir vacio';
        this.notifyError(mensaje);
        return;
      }
      if (name.length < 1) {
        const mensaje = 'El campo de nombre no puede ir vacio';
        this.notifyError(mensaje);
        return;
      }

      if (expiry.length < 1) {
        const mensaje =
          'El campo de expiracion de la tarjeta no puede ir vacio';
        this.notifyError(mensaje);
        return;
      }
    } else {
      let infoCards = {
        firstName: firstName,
        lastName: lastName,
        safeIdentifier: number,
        validThru: expiry
      };
      this.setState({
        infoCards: infoCards
      });
      this.sendCard(infoCards);
    }
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { classes } = this.props;
    const {
      infoCustomers,
      name,
      number,
      expiry,
      cvc,
      focused,
      reload
    } = this.state;
    this.id_c = infoCustomers._id;

    if (reload) {
      window.location.reload();
    }

    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <CustomerClientsCardHeader
                classes={classes}
                infoCustomers={infoCustomers}
              />
            </Paper>
            <br />
            <Paper>
              <CustomerClientsCardDetail
                onOpenModalCustomer={this.onOpenModalCustomer}
                infoCustomers={infoCustomers}
              />
            </Paper>
            <br/>
            <Paper>
            <CustomerClientCardCards
              handleClickOpen={this.handleClickOpen}
              dataSourceTable={this.state.dataSourceTable}
              refreshTable={this.refreshTable}
            />
            </Paper>
            <CustomerClientDialogCards
              Transition={Transition}
              openCard={this.state.openCard}
              name={name}
              number={number}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              handleCallback={this.handleCallback}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
              handleInputFocus={this.handleInputFocus}
              handleClose={this.handleClose}
              redirectToTarget={this.redirectToTarget}
            />
            <CustomerClientDialogDetail
              Transition={Transition}
              openDetail={this.state.openDetail}
              onSubmitDetail={this.onSubmitDetail}
              onCloseModal={this.onCloseModal}
              dataSource={infoCustomers}
            />  
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(CustomersClients);
