import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import CardsListCustomersTable from './CustomersList/cardsListCustomersTable';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';


  class customerClientCardCards extends Component {

    constructor(props) {
      super(props);
      this.cardsListCustomersTable = React.createRef();
    }
  
  render(){
    const {handleClickOpen,dataSourceTable, refreshTable } = this.props;

    const columnsCards = [
      {
        id: 'cardCode',
        numeric: false,
        disablePadding: true,
        label: 'TARJETA'
      },
      {
        id: 'firstName',
        numeric: false,
        disablePadding: false,
        label: 'NOMBRE'
      },
      { id: 'lastName', numeric: true, disablePadding: false, label: 'APELLIDO' },
      {
        name: 'MODIFICAR',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Tooltip title='Modificar'>
                <IconButton
                  aria-label='Modify'
                  onClick={event => {
                    this.cardsListCustomersTable.current.onClickCard(tableMeta.rowData[3]);
                  }}
                >
                  <CreateIcon />
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
            return (
              <Tooltip title='Eliminar'>
                <IconButton
                  aria-label='Delete'
                  onClick={event => {
                    this.cardsListCustomersTable.current.onDeleteCard(tableMeta.rowData[3]);
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
  
  

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <Button onClick={handleClickOpen}>+AGREGAR TARJETA</Button>
          }
          title='TARJETAS'
        />
        <Divider />
        <Divider />
        <CardContent>
          <CardsListCustomersTable
            title={'Tarjetas'}
            dataSourceTable={dataSourceTable}
            columnsCards={columnsCards}
            refreshTable={refreshTable}
            ref = {this.cardsListCustomersTable}
          />
        </CardContent>
        <CardActions />
      </Card>
    </div>
  );
}

}

export default withStyles(withStyles)(customerClientCardCards);


