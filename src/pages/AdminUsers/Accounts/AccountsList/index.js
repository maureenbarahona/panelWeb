import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { withStyles} from '@material-ui/core/styles';
import {  MuiThemeProvider } from "@material-ui/core/styles";
import { TableFormat } from '../../../../components/Tables/TableFormat.js';

class AccountsList extends Component {
  isSelected = id => this.state.selected.indexOf(id) !== -1;

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
      position: toast.POSITION.TOP_CENTER,
      autoClose: false
    });
  };

  state = {
    order: 'desc',
    orderBy: 'createdAt',
    selected: [],
    data: [],
    clicks: 0,
    redirectToEdit: false,
    reload: false,
    openOptions: false,
    confirmAccount: false,
    accountID:'',
    getAccounts: {
      _id:'',
      displayName: '',
      isActive: true,
      status: '',
      balance: 0,
      commercialName: '',
      paymentProvider: '',
      phoneNumber: '',
      rtn: '',
      diaryTransactionLimit: 0,
      transactionMin: 0,
      transactionMax: 0,      
      branch: 0,
      address: '',
      createdAt: ''
    },
    page: 0,
    rowsPerPage: 10
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

  handleTableClick = (event, id, accountName, status, date, cell) => {
    this.setState({ clicks: this.state.clicks + 1 });
    if (this.state.clicks === 1) {
      this.setState({
        clicks: 0,
        redirectToEdit: true,
        getAccounts: {
          _id: id,
          accountName: accountName,
          status: status,
          createdAt: date
        }
      });
    }
  };

  onOpenAccount = () => {
    this.setState({ openOptions: false, redirectToEdit: true });
  };

  onDelete = () => {
   
  };

  onCloseOptions = () => {
    this.setState({ openOptions: false });
  };

  onCloseAccount = () => {
    this.setState({ confirmAccount: false, openOptions: false, reload: true });
  };

  onOpenOptions = (event, item) => {
    const {id, accountName, status, date} = item
    this.setState({
      openOptions: true,
      getAccounts: {
        _id: id,
        accountName: accountName,
        status: status,
        createdAt: date
      }
    });
  };
  getMuiTheme = () => TableFormat;


  render() {
    const {  columns, dataSource, classes } = this.props;
    const {
      redirectToEdit,
      accountID,
      reload
    } = this.state;

    const dataSourceAccount = dataSource.map(item => {
      let val= (item.status) ? 'ACTIVO' : 'INACTIVO';
      return [item.accountName, val,  moment(item.createdAt).format('DD MMMM YYYY hh:mm a'), item._id];
    });

    const options = {
      customToolbar: () => {

        return (
          
          <Button           
            variant='contained'
            color='primary'
            className={classes.button} 
            style={{ background: '#F7931D', border: '#F7931D', marginBottom: 10 }}
            onClick={() => this.props.onOpenModal()}
          >
          + NUEVO COMERCIO 
          </Button>
        );
      },
      filterType: 'dropdown',
      responsive: 'scroll',
      filter: true,
      search: false,
      selectableRows: 'none',
      download: false,
      pagination: true,
      viewColumns: false,
      print: false,
      rowsPerPage: 50,
      onRowClick: (rowData, rowIndex) => {
        const dataTemp = this.props.dataSource;
        const position = rowIndex.dataIndex;
        const accountID = dataTemp[position]._id;
             this.setState({
          redirectToEdit: true,
          accountID: accountID
        });
      },
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


 
    if (redirectToEdit)    
      return (        
        <Redirect push
          to={{
            pathname: `/panel/AccountDetail/${accountID}`,
          }}
        />
      );

    if (reload) {
      window.location.reload();
    }

    return (
      
      <div>
        <ToastContainer />   
       <div>
       <Grid item xs={12}>

        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={'LISTA DE COMERCIOS'}
            data={dataSourceAccount}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        

        </Grid>
        </div>
        </div>
      
      
    );
  }
}

AccountsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(withStyles)(AccountsList);
