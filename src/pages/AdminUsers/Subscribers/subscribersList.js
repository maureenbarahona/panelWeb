import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import style from './subscribersList.css';
import MUIDataTable from 'mui-datatables';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import ButtonModal from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { authHeader } from '../../../services/user';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { headers, baseURL } from '../../../services/request';
import DialogContentText from '@material-ui/core/DialogContentText';
import { TableFormat } from '../../../components/Tables/TableFormat.js';

class SubscribersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: 'desc',
      orderBy: 'createdAt',
      selected: [],
      data: [],
      clicks: 0,
      redirectToEdit: false,
      reload: false,
      openOptions: false,
      confirmSubscriber: false,
      subscriberId: '',
      getSubscribers: {
        _id: '',
        customerName: '',
        description: '',
        amount: '',
        createdAt: ''
      },
      page: 0,
      rowsPerPage: 10
    };
  }

  getMuiTheme = () => TableFormat;
  isSelected = id => this.state.selected.indexOf(id) !== -1;

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

  deleteSubscriber = async values => {
    const _id = this.state.subscriberId;
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.delete(
        `${baseURL}/subscriptions/${_id}`,
        axiosConfig
      );
      const { data } = response;
      this.props.refreshTable();
      this.setState({
        data: data,
        confirmSubscriber: true
      });
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError('HUBO UN ERROR: ' + message);
    }
  };

  handleTableClick = (
    event,
    id,
    customerName,
    description,
    amount,
    date,
    cell
  ) => {
    this.setState({ clicks: this.state.clicks + 1 });
    if (this.state.clicks === 1) {
      this.setState({
        redirectToEdit: true,
        clicks: 0,
        getSubscribers: {
          _id: id,
          customerName: customerName,
          description: description,
          amount: amount,
          createdAt: date
        }
      });
    }
  };

  onDelete = () => {
    this.setState({ openOptions: false });
    this.deleteSubscriber(this.state.getSubscribers);
  };

  onCloseOptions = () => {
    this.setState({ openOptions: false });
  };

  onOpenOptions = (
    event,
    id,
    customerName,
    description,
    amount,
    date,
    cell
  ) => {
    this.setState({
      openOptions: true,
      getSubscribers: {
        _id: id,
        customerName: customerName,
        description: description,
        amount: amount,
        createdAt: date
      }
    });
  };

  onCloseSubscriber = () => {
    this.setState({
      confirmSubscriber: false,
      openOptions: false,
    });
  };

  render() {
    const { classes } = this.props;
    const dataSourceC = this.props.dataSource.map(item => {
      return [
        item.name,
        item.customers.length,
        item.products.length,
        `L ${item.amount.toLocaleString(navigator.language, {
          minimumFractionDigits: 2
        })}`,
        moment(item.createdAt).format('DD MMMM YYYY hh:mm a'),
        item._id
      ];
    });
    const columns = [
      {
        id: 'subscriptionName',
        numeric: false,
        disablePadding: true,
        label: 'NOMBRE'
      },
      {
        id: 'customerName',
        numeric: false,
        disablePadding: true,
        label: 'CLIENTE'
      },
      {
        id: 'productName',
        numeric: false,
        disablePadding: false,
        label: 'PRODUCTOS'
      },
      { id: 'amount', numeric: true, disablePadding: false, label: 'MONTO' },
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
            const dataTemp = this.props.dataSource;
            const position = tableMeta.rowIndex;
            const Subscribers = dataTemp[position];
            return (
              <Tooltip title='Detalle'>
                <IconButton
                  style={{ padding: '1px 1px 1px 1px' }}
                  aria-label='Modify'
                  onClick={event => {
                    this.handleTableClick(
                      Subscribers._id,
                      Subscribers.customerName,
                      Subscribers.description,
                      Subscribers.amount,
                      Subscribers.createdAt
                    );
                    this.setState({
                      redirectToEdit: true,
                      subscriberId: Subscribers._id
                    });
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
            const dataTemp = tableMeta.rowData;
            return (
              <Tooltip title='Detalle'>
                <IconButton
                  style={{ padding: '1px 1px 1px 1px' }}
                  aria-label='Modify'
                  onClick={event => {
                    this.setState({
                      subscriberId: dataTemp[5],
                      openOptions: true
                    });
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
      customToolbar: () => {
        return (
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            style={{
              background: '#F7931D',
              border: '#F7931D',
              marginBottom: 10,
              zIndex: 1
            }}
            onClick={() => this.props.onOpenModal()}
          >
            + NUEVA SUBSCRIPCION
          </Button>
        );
      },
      filterType: 'dropdown',
      responsive: 'scroll',
      filter: false,
      search: false,
      selectableRows: 'none',
      download: true,
      pagination: true,
      viewColumns: true,
      print: false,
      rowsPerPage: 50,
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
    const { redirectToEdit,  reload } = this.state;

    if (redirectToEdit)
      return (
        <Redirect
          to={{
            pathname: `/panel/Subscriber/${this.state.subscriberId}`
          }}
        />
      );

    if (reload)
      return (
        <Redirect
          to={{
            pathname: '/panel/subscribers'
          }}
        />
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
          <DialogTitle id='form-dialog-title'>
            OPCIONES DEL SUBSCRIPTOR
          </DialogTitle>
          <DialogContent>¿DESEAS BORRAR A ESTE SUBSCRIPTOR?</DialogContent>
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
          open={this.state.confirmSubscriber}
          onClose={this.onCloseSubscriber}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title2'>
            SUBSCRIPTOR BORRADO{' '}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Se ha borrado la informacion del subscriptor exitosamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseSubscriber} color='primary'>
              CONTINUAR
            </ButtonModal>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SubscribersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(SubscribersList);