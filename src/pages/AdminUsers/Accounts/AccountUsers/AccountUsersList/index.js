import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import 'react-toastify/dist/ReactToastify.css';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

class  AccountUsersList extends Component {
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  state = {
    order: 'desc',
    orderBy: 'createdAt',
    selected: [],
    data: [],
    reload: false,
    page: 0,
    rowsPerPage: 10
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, columns, dataSource } = this.props;
    
    const {
      reload
    } = this.state;
 

    if (reload) {
      window.location.reload();
    }
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      filter: false,
      search: false,
      selectableRows: false,
      download: false,
      pagination: false,
      viewColumns: false,
      print: false,
      rowsPerPage: 10,
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
    const dataSourceUser = dataSource.map(item => {
      return [item.email, item.name, item.workPhone, moment(item.createdAt).format(
        'DD MMMM YYYY hh:mm a'
      )];
    });

    return (
      <div>
        <Divider/>    
        
      <Divider/>  
        
       <div>  
       <Paper className={classes.root}>       
        <MUIDataTable
          data={dataSourceUser}
          columns={columns}
          options={options}
        />
        </Paper> 
        </div>
        </div>  
       
    
    );
  }
}

 AccountUsersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(withStyles)( AccountUsersList);
