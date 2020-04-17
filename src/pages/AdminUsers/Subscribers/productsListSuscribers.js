import './botones.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Dialog from '@material-ui/core/Dialog';
import ButtonModal from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles} from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';



let productsDataTemp = [];

class ProductsListSuscribers extends Component {

  getMuiTheme = () => TableFormat;

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selected: [],
      finalSelect: [],
    };
  }

  getRowsSelected = tablaState => {
    productsDataTemp = Object.keys(tablaState);
  };

  render() {
    const {
      columns,
      dataSource,
      openProducts,
      onConfirmTable,
      onCloseTableProducts
    } = this.props;

    const dataSourcef = dataSource.map(element => {
      return [
        element.name,
        element.description,
        element.price,
        element._id,
        element.pricefinal
      ];
    });

    const data = dataSourcef;

    const options = {
      delete: false,
      print: false,
      filter: false,
      rowsPerPage: 50,
      download: false,
      viewColumns: false,
      responsive: 'scroll',
      selectableRows: true,
      filterType: 'dropdown',
      rowsSelected: productsDataTemp,
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
      },
      onTableChange: (action, tableState) => {
        this.getRowsSelected(tableState.selectedRows.lookup);
      },
      onRowsSelect: (rowsSelected, allRows) => {
        const productosSeleccionados = allRows.map(element => {
          return {
            id: dataSourcef[element.dataIndex][3],
            name: dataSourcef[element.dataIndex][0],
            description: dataSourcef[element.dataIndex][1],
            price: dataSourcef[element.dataIndex][2],  
          };
        });
        this.setState({finalSelect: productosSeleccionados});
        return productosSeleccionados;
      }
    };

    return (
      <Dialog
        open={openProducts}
        aria-labelledby='form-dialog-title'
        maxWidth={'md'}
      >
        <DialogTitle id='form-dialog-title' />
        <DialogContent>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={'LISTA DE PRODUCTOS'}
              data={data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </DialogContent>
        <DialogActions>
          <ButtonModal
            onClick={() => {
              productsDataTemp =[];
              onCloseTableProducts();
            }}
            color='primary'
          >
            CANCELAR
          </ButtonModal>
          <ButtonModal
            onClick={() => {
              productsDataTemp =[];
              onConfirmTable(this.state.finalSelect);
            }}
            color='primary'
          >
            AGREGAR
          </ButtonModal>
        </DialogActions>
      </Dialog>
    );
  }
}

ProductsListSuscribers.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(withStyles)(ProductsListSuscribers);
