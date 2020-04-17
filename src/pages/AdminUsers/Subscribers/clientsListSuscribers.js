
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import Dialog from '@material-ui/core/Dialog';
import ButtonModal from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';

class clientsListSuscribers extends Component {
  getMuiTheme = () => TableFormat;
  constructor(props) {
    super(props);
    this.finalSelect = [];
    this.allRowsTemp = [];
    this.state = {
      selected: [],
      data: [],
      confirmSelectRows: false,
      confirmSelectImport: false,
      rowsSelectedIndex: []
    };
  }

  onTriggerSelectRows = () => {
   this.setState({confirmSelectRows: true})
   
  };

  onTriggerSelectRowsClose = () => {
    this.setState({confirmSelectRows: false})
    
   };

   onTriggerSelectRowsImport = () => {
    this.setState({confirmSelectImport: true})
    
   };
 
   onTriggerSelectRowsCloseImport = () => {
     this.setState({confirmSelectImport: false})
     
    };

  render() {
    const {
      columns,
      openClients,
      openClientsImport,
      dataSourceClients,
      onCloseTableClients,
      onCloseTableClientsImport,       
      onConfirmTableClients,
      allRowSelectedCustomersIndex,
      allRowSelectedCustomersIndexImport
    } = this.props;

    const { confirmSelectRows, confirmSelectImport} = this.state;



    const dataSourcef = dataSourceClients.map(element => {
      const cards = element.dataCard;
      let valCardsID = '';
      let cardsID = '';
      if (cards.length >= 1) {
        cardsID = cards[0].valCard;
        cards.forEach(element1 => {
          valCardsID += `${element1.valCard} `;
        });
      } else {
        valCardsID = 'NO TIENE TARJETAS REGISTRADAS';
      }

      return[
        valCardsID,
        `${element.firstName} ${element.lastName}`,
        element.email,
        element._id,
        cardsID
      ];
    });

    const data = dataSourcef;
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      delete:false,
      filter: false,
      selectableRows: true,
      download: false,
      viewColumns: false,
      print: false,
      rowsPerPage: 50,
      rowsSelected: this.state.rowsSelectedIndex,
      textLabels: {
        body: {
          noMatch: 'Datos aun no agregados',
          toolTip: 'Sort',
        },
        pagination: {
          next: 'Siguiente Pagina',
          previous: 'Pagina Anterior',
          rowsPerPage: 'Filas por pagina:',
          displayRows: 'of',
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Descargar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver Columnas',
          filterTable: 'Filtrar Tablas',
        },
        filter: {
          all: 'All',
          title: 'FILTROS',
          reset: 'REINICIAR',
        },
        viewColumns: {
          title: 'Mostrar Columnas',
          titleAria: 'Mostrar/Ocultar Columnas',
        },
        selectedRows: {
          text: 'filas seleccionadas',
          delete: '',
          deleteAria: 'filas seleccionadas'
        },
      },
      onRowsSelect: (rowsSelected, allRows) => {
        const clientsSelected = allRows.map(element => {
         
          return {
            id: dataSourcef[element.dataIndex][3],
            dataCard: dataSourcef[element.dataIndex][0],
            name: dataSourcef[element.dataIndex][1],
            email: dataSourcef[element.dataIndex][2],
            idCard: dataSourcef[element.dataIndex][3]
          };

        })
        this.finalSelect = clientsSelected;
        const rowSelectTemp = allRows.map(value =>{
        return value.index;
        })

this.setState({rowsSelectedIndex: rowSelectTemp})

        return clientsSelected;
      }

    };

    if (confirmSelectRows) {
        onConfirmTableClients(this.finalSelect, this.state.rowsSelectedIndex);
        this.onTriggerSelectRowsClose();
    }

    const optionsImport = {
      filterType: 'dropdown',
      responsive: 'scroll',
      delete:false,
      filter: false,
      selectableRows: true,
      download: false,
      viewColumns: false,
      print: false,
      rowsPerPage: 50,
      rowsSelected: allRowSelectedCustomersIndex,
      textLabels: {
        body: {
          noMatch: 'Datos aun no agregados',
          toolTip: 'Sort',
        },
        pagination: {
          next: 'Siguiente Pagina',
          previous: 'Pagina Anterior',
          rowsPerPage: 'Filas por pagina:',
          displayRows: 'of',
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Descargar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver Columnas',
          filterTable: 'Filtrar Tablas',
        },
        filter: {
          all: 'All',
          title: 'FILTROS',
          reset: 'REINICIAR',
        },
        viewColumns: {
          title: 'Mostrar Columnas',
          titleAria: 'Mostrar/Ocultar Columnas',
        },
        selectedRows: {
          text: 'filas seleccionadas',
          delete: 'Borrar',
          deleteAria: 'Borrar filas seleccionadas',
        },
      },
      onRowsSelect: (rowsSelected, allRows) => {
        const clientsSelected = allRows.map(element => {
         
          return {
            id: dataSourcef[element.dataIndex][3],
            dataCard: dataSourcef[element.dataIndex][0],
            name: dataSourcef[element.dataIndex][1],
            email: dataSourcef[element.dataIndex][2],
            idCard: dataSourcef[element.dataIndex][3]
          };

        })
        this.finalSelect = clientsSelected;
        const rowSelectTemp = allRows.map(value =>{
        return value.index;
        })

this.setState({rowsSelectedIndex: rowSelectTemp})

        return clientsSelected;
      }

    };

    if(openClientsImport){
     this.setState({confirmSelectImport : true});
    }

    if (confirmSelectImport) {
    let resultSelect = optionsImport.onRowsSelect(allRowSelectedCustomersIndexImport, allRowSelectedCustomersIndexImport)
    onConfirmTableClients(resultSelect, this.state.rowsSelectedIndex);
      this.onTriggerSelectRowsCloseImport();
    }
    
    return (
      <div>
      <Dialog
        open={openClients}
        aria-labelledby='form-dialog-title'
        maxWidth={'md'}
      >
        <DialogTitle id='form-dialog-title' />
        <DialogContent>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={'LISTA DE CLIENTES'}
            data={data}
            columns={columns}
            options={options}
          />
          </MuiThemeProvider>
        </DialogContent>
        <DialogActions>
          <ButtonModal
            onClick={() => {
              this.setState({rowsSelectedIndex: allRowSelectedCustomersIndex})
        onCloseTableClients();
            }}
            color='primary'
          >
            CANCELAR
          </ButtonModal>
          <ButtonModal
            onClick={() => {
             this.onTriggerSelectRows();
            }}
            color='primary'
          >
            AGREGAR
          </ButtonModal>
        </DialogActions>
      </Dialog>

<Dialog
aria-labelledby='form-dialog-title'
fullScreen
>
<DialogTitle id='form-dialog-title' />
<DialogContent>
<MuiThemeProvider theme={this.getMuiTheme()}>
  <MUIDataTable
    title={'LISTA DE CLIENTES'}
    data={data}
    columns={columns}
    options={optionsImport}
  />
  </MuiThemeProvider>
</DialogContent>
<DialogActions>
  <ButtonModal
    onClick={() => {
      this.setState({rowsSelectedIndex: allRowSelectedCustomersIndex})
onCloseTableClientsImport();
    }}
    color='primary'
  >
    CANCELAR
  </ButtonModal>
  <ButtonModal
    onClick={() => {
     this.onTriggerSelectRowsImport();
    }}
    color='primary'
  >
    CONFIRMAR
  </ButtonModal>
</DialogActions>
</Dialog>
</div>
    );
  }
}

clientsListSuscribers.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(withStyles)(clientsListSuscribers);
