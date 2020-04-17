import React from 'react';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import { withStyles } from '@material-ui/core/styles';

  
  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    filter: false,
    search: false,
    selectableRows: 'none',
    download: false,
    pagination: true,
    viewColumns: false,
    print: false,
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
        delete: 'Borrar',
        deleteAria: 'Borrar filas seleccionadas'
      }
    }
  };

const billingSummaryTable = props => {
  
  const { productsData, totalPayment, columnsTable } = props;
  return (
    <div >
     <Grid item xs={12}>          
    

            <MuiThemeProvider theme={TableFormat}>
              <MUIDataTable
                title={'PRODUCTOS DEL PEDIDO'}
                data={productsData}
                columns={columnsTable}
                options={options}
              >             
              </MUIDataTable> 
            </MuiThemeProvider> 

            </Grid>
            <Grid item xs={12}>
              <Paper>
                <b>
              <div
                style={{
                  textAlign: 'right',
                  fontFamily: 'verdana',
                  fontSize: '24',
                  letterSpacing: 1,
                  color: '#F7931D',
                  marginBottom: 15,
                  marginRight: 10,
                  marginLeft: 10,
                  padding: 15
                }}
              >
                TOTAL A PAGAR: L
                {new Intl.NumberFormat('es-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                }).format(totalPayment)}
              </div>
              </b>
              </Paper>
            </Grid>
    </div>
  );
};

export default withStyles(withStyles)(billingSummaryTable);
