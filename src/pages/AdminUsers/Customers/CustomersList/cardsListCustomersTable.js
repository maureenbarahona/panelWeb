import axios from 'axios';
import PropTypes from 'prop-types';
import CardR from 'react-credit-cards';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import style from './cardsListCustomersTable.css';
import 'react-credit-cards/es/styles-compiled.css';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { authHeader } from '../../../../services/user';
import { ToastContainer, toast } from 'react-toastify';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { headers, baseURL } from '../../../../services/request';
import { TableFormat } from '../../../../components/Tables/TableFormat';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../utilsCard';


class CardsListCustomersTable extends Component {

  constructor(props) {
    super(props);
    this.finalSelect = [];
    this.refreshTimeCards = this.refreshTimeCards.bind(this);
    this.state = {
      order: 'desc',
      secondsRefreshCard: 10,
      orderBy: 'createdAt',
      selected: [],
      data: [],
      redirectToEdit: false,
      openCardEdit: false,
      redirectToCard: false,
      reload: false,
      openOptions: false,
      confirmProduct: false,
      getCards: {
        _id: '',
        firstName: '',
        lastName: '',
        safeIdentifier: '',
        validThru: '',
        idCard: ''
      },
      page: 0,
      rowsPerPage: 10,
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      formData: null
    };
  }

  getMuiTheme = () => {
    return(TableFormat)
  };

  toastId = null;
  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 9000
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onOpenProduct = () => {
    this.setState({ openOptions: false, redirectToEdit: true });
  };

  onCloseOptions = () => {
    this.setState({ openOptions: false });
  };

  onCloseProduct = () => {
    this.setState({ confirmProduct: false, openOptions: false, reload: true });
  };

  deleteCard2 = async (customerID, cardID) => {
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.delete(
        `${baseURL}/customers/${customerID}/cards/${cardID}`,
        axiosConfig
      );
      const { data } = response;
      this.setState({ data });
      this.notifySuccess('Tarjeta eliminada exitosamente');
      this.props.refreshTable();
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
      this.setState({ submitted: false, sendButtonDisabled: false });
    }
  };

  deleteCard = async (customerID, cardID) => {
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.delete(
        `${baseURL}/customers/${customerID}/cards/${cardID}`,
        axiosConfig
      );
      const { data } = response;

      this.setState({
        data: data,
        submitted: false,
        sendButtonDisabled: false,
        redirectToEdit: true
      });
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexion';
      this.notifyError(message);
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.setState({ submitted: false, sendButtonDisabled: false });
    }
  };

  sendCard = async values => {
    const axiosBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      safeIdentifier: values.safeIdentifier,
      validThru: values.validThru
    };

    const { _id } = this.state.getCards;
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
      this.notifySuccess('Tarjeta modificada exitosamente');
      this.props.refreshTable();
      this.setState({
        openCardEdit: false,
        openCard: false,
        data: data,
        submitted: false,
        sendButtonDisabled: false,
        redirectToEdit: true
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

  refreshTimeCards() {
    if (this.state.secondsRefreshCard > 0) {
      this.setState({ secondsRefreshCard: this.state.secondsRefreshCard - 1 });
    } else {
      clearInterval(this.timer);
    }
  }

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

  onOpenModalCards = () => {
    this.setState({ openCardEdit: true, number: '', name: '', expiry: '' });
  };

  onCloseModalCards = () => {
    this.setState({ openCardEdit: false });
  };

  updateCardCustomer = () => {
    this.props.refreshTable();
    const { _id, cardID } = this.state.getCards;
    this.deleteCard(_id, cardID);
    const { name, number, expiry } = this.state;

    let getCards = this.state.getCards;

    let customerCardName = name,
      separator = ' ',
      limit = 3,
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
      getCards.firstName = firstName;
      getCards.lastName = lastName;
      getCards.safeIdentifier = number;
      getCards.validThru = expiry;

      this.setState({
        getCards: getCards
      });

      this.sendCard(getCards);
    }
  };

  onClickCard = (id) => {
    const dataTemp = this.props.dataSourceTable;
    let cardsListArray = dataTemp.cards;
    const cardID = id;
    const _id = dataTemp._id;
    cardsListArray = cardsListArray.filter(card => (card._id.includes(cardID)));

    const clientCard = cardsListArray[0];
    const name = `${clientCard.firstName} ${clientCard.lastName}`;
    const expiry = clientCard.validThru;

    this.setState({
      number: '',
      name,
      expiry,
      openCardEdit: true,
      getCards: {
        _id,
        cardID
      }
    });
  };

  onDeleteCard = (id) => {
    const dataTemp = this.props.dataSourceTable;
    const cardID = id;
    const _id = dataTemp._id;
    this.deleteCard2(_id, cardID);
  };

  render() {
    const { columnsCards, dataSourceTable } = this.props;
    const {
      cvc,
      name,
      number,
      expiry,
      focused,
      getCards,
      redirectToCard,
      openCardEdit
    } = this.state;

    if (redirectToCard)
      return (
        <Redirect
          to={{
            pathname: '/panel/CardDetail',
            dataClient: { ...getCards }
          }}
        />
      );

    let dataSourceC = [];
    if (Object.entries(dataSourceTable).length === 0) {
      dataSourceC = [['Aun no agregada']];
    } else {
      for (let value of Object.values(dataSourceTable.cards)) {
        dataSourceC.push([
          `${value.brand} ${value.safeIdentifier}`,
          value.firstName,
          value.lastName,
          value._id,
          value.validThru
        ]);
      }
    }
    const data = dataSourceC;
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      filter: false,
      search: false,
      selectableRows: 'none',
      selectableAllRows: false,
      download: false,
      pagination: false,
      viewColumns: false,
      print: false,
      rowsPerPage: 50,
      onChangePage: numberRows => {},
      textLabels: {
        body: {
          noMatch: 'Datos aun no agregados',
          toolTip: 'Sort'
        },
        pagination: {
          next: 'Siguiente Pagina',
          previous: 'Pagina Anterior',
          rowsPerPage: 'Filas por pagina:',
          displayRows: 'of'
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Descargar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver Columnas',
          filterTable: 'Filtrar Tablas'
        },
        filter: {
          all: 'All',
          title: 'FILTROS',
          reset: 'REINICIAR'
        },
        viewColumns: {
          title: 'Mostrar Columnas',
          titleAria: 'Mostrar/Ocultar Columnas'
        },
        selectedRows: {
          text: 'filas seleccionadas',
          delete: 'Borrar',
          deleteAria: 'Borrar filas seleccionadas'
        }
      }
    };
    return (
      <div>       
      
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={''}
          data={data}
          columns={columnsCards}
          options={options}
        />
      </MuiThemeProvider>

        <ToastContainer />
        <Dialog open={openCardEdit} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>MODIFICAR TARJETA</DialogTitle>
          <DialogContent>
            <div key='Payment'>
              <div className='App-payment'>
                <CardR
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focused}
                  callback={this.handleCallback}
                />
                <br />
                <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <TextField
                      autoFocus
                      margin='dense'
                      type='tel'
                      name='number'
                      value={number}
                      placeholder='Numero de Tarjeta'
                      pattern='[\d| ]{16,22}'
                      required
                      onChange={this.handleInputChange}
                      label='Numero de tarjeta'
                      onFocus={this.handleInputFocus}
                      fullWidth
                    />
                  </div>
                  <br />
                  <div className='form-group'>
                    <TextField
                      type='text'
                      name='name'
                      margin='dense'
                      value={name}
                      label='Nombre y Apellido'
                      fullWidth
                      placeholder='Nombre y Apellido'
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <br />
                  <div className='row'>
                    <div className='col-6'>
                      <TextField
                        type='tel'
                        name='expiry'
                        placeholder='Fecha de Expiracion'
                        pattern='\d\d/\d\d'
                        margin='dense'
                        label='Fecha de Expiracion'
                        value={expiry}
                        fullWidth
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseModalCards} color='primary'>
              CANCELAR
            </ButtonModal>
            <ButtonModal onClick={this.updateCardCustomer} color='primary'>
              MODIFICAR
            </ButtonModal>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CardsListCustomersTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(style)(CardsListCustomersTable);
