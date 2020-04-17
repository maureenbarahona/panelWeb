import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import { MuiThemeProvider } from '@material-ui/core/styles';

class ProductsListSuscribersTable extends Component {
  getMuiTheme = () => TableFormat;

  constructor(props) {
    super(props);

    this.state = {
      rowsPerPage: 10
    };
  }

  render() {
    const { columns, dataSourceTable } = this.props;
    const dataSourceC = dataSourceTable.map(item => {
      return [item.name, item.description, item.price, item.id];
    });

    const data = dataSourceC;
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      delete:false,
      filter: false,
      selectableRows: 'none',
      download: false,
      viewColumns: false,
      print: false,
      search: false,
      pagination: false,
      rowsPerPage: 5,
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
          delete: '',
          deleteAria: 'filas seleccionadas'
        }
      }
    };

    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={''}
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>

    );
  }
}

ProductsListSuscribersTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(withStyles)(ProductsListSuscribersTable);
