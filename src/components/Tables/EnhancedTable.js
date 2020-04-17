import React from 'react';
import MUIDataTable from 'mui-datatables';
import {TableFormat} from './TableFormat';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import moment from 'moment';



const getMuiTheme = () => TableFormat;

const EnhancedTable = props => {
    
  const { title,columns,data } = props;

  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    filter: true,
    search: false,
    selectableRows: 'none',
    download: true,
    pagination: true,
    viewColumns: true,
    print: false,
    rowsPerPage: 50,
    sortFilterList: true,
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
    customSort: (data, colIndex, order) => {
      const col = columns[colIndex];
    
      if (
        col.id === "createdAt" ||
        col.id === "updatedAt" ||
        col.label.includes("FECHA") ||
        col.label.includes("CREADO")
      ) {
        console.log('entro al if de fecha');
          return data.reverse((a, b) => {
            const dateA = Number(moment(a.data[6]).format("YYYYMMDDHHmm"));
            const dateB = Number(moment(b.data[6]).format("YYYYMMDDHHmm"));
            const returnValue = (dateA < dateB *(-1));
            return returnValue;
          });
      } else {
        console.log('entro al else');
        return data.sort((a, b) => {
          const itemA =  a.data[colIndex];
          const itemB =  b.data[colIndex];
          let returnValue = (order !=='asc') ? itemA.localeCompare(itemB) : itemB.localeCompare(itemA); 
          return returnValue;

        });
      }
    }
  };
  return (
    <div>
       <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={title}
              data={data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
    </div>
  );
};

export default withStyles(withStyles)(EnhancedTable);
