import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import ButtonModal from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { authHeader } from '../../../../services/user';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { headers, baseURL } from '../../../../services/request';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TableFormat } from '../../../../components/Tables/TableFormat.js';


class CustomersList extends Component {
  getMuiTheme = () => TableFormat;

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
    order: 'desc',
    orderBy: 'createdAt',
    selected: [],
    data: [],
    confirmCustomer: false,
    dataSource: [],
    redirectToEdit: false,
    clicks: 0,
    clientId: '',
    openOptions: false,
    getCustomers: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobileNumber: '',
      dataCard: [],
      dataCardDetail: []
    },
    reload: false,
    page: 0,
    rowsPerPage: 10
  };

  deleteCustomer = async values => {
    const _id = this.state.clientId;
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      const response = await axios.delete(
        `${baseURL}/customers/${_id}`,
        axiosConfig
      );
      const { data } = response;
      this.notifySuccess('Cliente borrado exitosamente');
      this.setState({
        data: data,
        submitted: false,
        reload: true,
        clientId: ''
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

  handleTableClick = (
    event,
    clientId,
    id,
    first,
    last,
    email,
    date,
    address,
    mobileNumber,
    dataCard,
    dataCardDetail,
    cell
  ) => {
    this.setState({
      redirectToEdit: true,
      clientId,
      getCustomers: {
        _id: id,
        firstName: first,
        lastName: last,
        email: email,
        createdAt: date,
        address: address,
        mobileNumber: mobileNumber,
        dataCard: dataCard,
        dataCardDetail: dataCardDetail
      }
    });
  };

  onOpenCustomer = () => {
    this.setState({ openOptions: false, redirectToEdit: true });
  };

  onDelete = () => {
    this.setState({ openOptions: false });
    this.deleteCustomer(this.state.getCustomers);
  };

  onCloseOptions = () => {
    this.setState({ openOptions: false });
  };

  onCloseCustomer = () => {
    this.setState({ reload: true });
  };

  onCloseCustomer = () => {
    this.setState({ confirmCustomer: false, openOptions: false });
  };

  onOpenOptions = (
    event,
    id,
    firstName,
    lastName,
    email,
    date,
    address,
    mobileNumber,
    cell
  ) => {
    this.setState({ openOptions: true });
    this.setState({
      getCustomers: {
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: date,
        address: address,
        mobileNumber: mobileNumber
      }
    });
  };

  render() {
    const { redirectToEdit, reload } = this.state;
    const { classes } = this.props;

    if (redirectToEdit && this.state.clientId !== '')
      return (
        <Redirect
          to={{
            pathname: `/panel/customers/${this.state.clientId}`
          }}
        />
      );
    if (reload) {
      window.location.reload();
    }
    const columns = [
      { id: 'name', numeric: false, disablePadding: true, label: 'CLIENTE' },
      { id: 'IdCard', numeric: false, disablePadding: false, label: 'TARJETA' },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'CREADO'
      },
      {
        name: 'DETALLE',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const dataTemp = tableMeta.rowData;
            const clientId = dataTemp[3];
            const positionData = tableMeta.rowIndex;
            const customer = this.props.dataSource[positionData];

            return (
              <Tooltip title='Detalle'>
                <IconButton
                  style={{ padding: '1px 1px 1px 1px' }}
                  aria-label='Modify'
                  onClick={event => {
                    this.handleTableClick(
                      clientId,
                      customer._id,
                      customer.firstName,
                      customer.lastName,
                      customer.email,
                      customer.createdAt,
                      customer.address,
                      customer.mobileNumber,
                      customer.dataCard,
                      customer.dataCardDetail
                    );
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            );
          }
        }
      },
      {
        name: 'ELIMINAR',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const positionData = tableMeta.rowIndex;
            const customer = this.props.dataSource[positionData];
            return (
              <Tooltip title='Eliminar'>
                <IconButton
                  style={{ padding: '1px 1px 1px 1px' }}
                  aria-label='Modify'
                  onClick={event => {
                    this.setState({
                      clientId: tableMeta.rowData[3],
                      openOptions: true
                    });
                    this.onOpenOptions(
                      customer._id,
                      customer.firstName,
                      customer.lastName,
                      customer.email,
                      customer.createdAt,
                      customer.address,
                      customer.mobileNumber,
                      customer.dataCard,
                      customer.dataCardDetail
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            );
          }
        }
      }
    ];
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      filter: true,
      search: false,
      selectableRows: 'none',
      selectableAllRows: false,
      download: true,
      pagination: true,
      viewColumns: true,
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
      },
      customToolbar: () => {
        return (
          <React.Fragment >        
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            style={{
              background: '#F7931D',
              border: '#F7931D',
              position: 'absolute', right: 220
            }}
            onClick={() => this.props.onOpenModal()}
          >
            + NUEVO CLIENTE
          </Button>
        </React.Fragment>
        
        );
      }
    };
    const dataSourceC = this.props.dataSource.map(item => {
      return [
        `${item.firstName} ${item.lastName}`,
        item.dataCard,
        moment(item.createdAt).format('DD MMMM YYYY hh:mm a'),
        item._id
      ];
      
    }
    );

    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={''}
            data={dataSourceC}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        <Dialog
          open={this.state.openOptions}
          onClose={this.onCloseOptions}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>OPCIONES DEL CLIENTE</DialogTitle>
          <DialogContent>¿ESEAS BORRAR A ESTE CLIENTE?</DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseOptions} color='primary'>
              NO
            </ButtonModal>
            <ButtonModal onClick={this.onDelete} color='primary'>
              SI
            </ButtonModal>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.confirmCustomer}
          onClose={this.onCloseCustomer}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id={'form-dialog-title2'}>CLIENTE BORRADO </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Se ha borrado la informacion del cliente exitosamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseCustomer} color='primary'>
              CONTINUAR
            </ButtonModal>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
CustomersList.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(withStyles)(CustomersList);