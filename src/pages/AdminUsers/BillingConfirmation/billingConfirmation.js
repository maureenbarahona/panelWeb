import styles from './index.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularLoading from '../../../components/Loading';
import { getOneBilling } from '../../../api/billing/apiBilling.js';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { dateTextFormat } from '../../../utils/helpers';

class BillingConfirmation extends Component {
  getMuiTheme = () => TableFormat;

  state = {
    loading: false,
    dataSource: [],
    redirectToBilling:false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getData3(id);
  }

  handleButton() {
    this.setState({ redirectToBilling: true });
  }

  async getData3(id) {
    

    this.setState({ loading: true });
    getOneBilling(id)
      .then(data => {
        this.setState({
          dataSource: data,
          loading: false
        });
      })
      .catch(err =>
        this.setState({
          loading: false,
          notification: {
            message: err,
            open: true,
            variant: 'error'
          }
        })
      );
  }

  render() {
    const { loading, dataSource } = this.state;
    const { classes } = this.props;

    let productsArrayC = [];
    let amount = '';
    let name = '';
    let _id = '';

    if(this.state.dataSource.products){
      productsArrayC = dataSource.products;
      amount = 
      'L. ' +
      new Intl.NumberFormat('es-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(this.state.dataSource.amount);
      name = dataSource.name;
      _id = dataSource._id;
    }

    const dataSourceC = [
      [
        dateTextFormat(this.state.dataSource.createdAt),
        this.state.dataSource.name,
        'L. ' +
          new Intl.NumberFormat('es-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }).format(this.state.dataSource.amount)
      ]
    ];

    const columns = [
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'FECHA'
      },
      { id: 'client', numeric: false, disablePadding: true, label: 'CLIENTE' },
      {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'MONTO TOTAL'
      },
      {
        name: 'DESCRIPCION',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {

            return (
              <div style={{ flexGrow: 1 }}>
                <Paper
                  style={{ width: '100%', marginTop: 5, overflowX: 'auto' }}
                >
                  <Table style={{ minWidth: 50 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>PRODUCTO</TableCell>
                        <TableCell align='right'>CANTIDAD</TableCell>
                        <TableCell align='right'>PRECIO</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsArrayC.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component='th' scope='row'>
                            {row.name}
                          </TableCell>
                          <TableCell align='right'>{row.quantity}</TableCell>
                          <TableCell align='right'>{`L ${row.price.toLocaleString(
                            navigator.language,
                            { minimumFractionDigits: 2 }
                          )}`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            );
          }
        }
      }
    ];

    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      filter: false,
      search: false,
      selectableRows: 'none',
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
        <Card className={classes.card} style={{ marginTop: 15 }}>
          <CardHeader
            title='ID DE FACTURACIÓN: '
            subheader={
              <h4 style={{ color: 'gray' }}>{_id}</h4>
            }
          />
          <Divider />
          <CardContent>
            {loading ? (
              <CircularLoading />
            ) : (
              <div>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                  paragraph
                >
                  <p>
                    {' '}
                    <b>Hola {name}</b> <br /> Has realizado un pago de{' '}
                    <b>{amount}</b> a razón de la siguiente factura: {' '}
                  </p>
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={classes.card} style={{ marginTop: 15 }}>
          <CardHeader title='DETALLE DE FACTURA: ' />
          <Divider />
          <CardContent>
            {loading ? (
              <CircularLoading />
            ) : (
              <div>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    title={''}
                    data={dataSourceC}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
                <Divider />
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                  align='right'
                  style={{marginRight:'15px', color:'orange'}}
                >
                  <b>TOTAL PAGADO: {amount}</b>
                </Typography>

              </div>
            )}
          </CardContent>

          <Grid container spacing={3}>
            <Grid item xs={8}></Grid>
            <Grid item xs></Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleButton()}
                style={{
                  background: "#F7931D",
                  border: "#F7931D",
                  margin: 15
                }}
                type="submit"
              >
                REGRESAR
              </Button>{" "}
            </Grid>
          </Grid>;

        </Card>
        {this.state.redirectToBilling && 
          <Redirect push
            to={{
              pathname: '/panel/Billing',
            }}
          />
        }
      </div>
    );
  }
}

BillingConfirmation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BillingConfirmation);