import React from 'react';
import MUIDataTable from 'mui-datatables';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const columns = ['email', 'nombre', 'Telefono', 'creado'];

const accountCardUsers = props =>{
  const { onAddUser, usersAccount } = props;
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
  return (
      <div>
      <Card>
        <CardHeader
          action={
            <Button onClick={onAddUser}>
              +AGREGAR USUARIO
            </Button>
          }
          title='LISTA DE USUARIOS'
          subheader=''
        />
        <Divider />
        <CardContent>
          <MUIDataTable
            data={usersAccount}
            columns={columns}
            options={options}
          />
        </CardContent>
      </Card>
    </div>
  );
}


export default withStyles(withStyles)(accountCardUsers);
