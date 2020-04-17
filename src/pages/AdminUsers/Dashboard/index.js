import axios from 'axios';
import style from './styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { authHeader } from '../../../services/user';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Notifications from '../../../components/SnackBar';
import ListItemText from '@material-ui/core/ListItemText';
import Filter from '../../../components/Container/Filters';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { headers, baseURL } from '../../../services/request';
import EnhancedTable from '../../../components/Tables/EnhancedTable';
import SearchBar from '../../../components/Container/Header/SearchBar';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import {
  startDateFormat,
  endDateFormat,
  dateUnixFormat,
  dateTextFormat,
  startDateOf,
  endDateOf
} from '../../../utils/helpers';

let myStartDate;
let myEndDate;

class Dashboard extends Component {
  state = {
    dataSource: [],
    dataSourceOriginal: [],
    dataSourceFormat: [],
    startDate: startDateOf(),
    endDate: endDateOf(),
    balanceObject: {},
    balanceNum: 0,
    balanceNegative: 0,
    balanceBanpais: 0,
    balanceBAC: 0,
    open: false,
    transactionObject: {},
    notification: {
      open: false,
      message: '',
      variant: ''
    }
  };

  filterProps = {
    disableButton: true,
    loading: this.state.loading,
    rangePickerProps: {
      defaultValue: [this.state.startDate, this.state.endDate],
      onChangeStart: event => {
        myStartDate = startDateFormat(event.target.value);
        this.getData();
      },
      onChangeEnd: event => {
        myEndDate = endDateFormat(event.target.value);
        this.getData();
      }
    },
    buttonProps: {
      onClick: () => {
        this.getData();
      }
    }
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  async getData() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    const startDate = dateUnixFormat(myStartDate);
    const endDate = dateUnixFormat(myEndDate);

    try {
      const { data } = await axios.get(
        `${baseURL}/payments?startDate=${startDate}&endDate=${endDate}&include=issuer`,
        axiosConfig
      );
      this.processData(data);
      this.setState({
        dataSource: data,
        loading: false
      });
    } catch (error) {
      const { response } = error;

      let message = 'Error de conexión';
      if (response) {
        const { data } = response;
        message = data.message;
      }

      this.setState({
        loading: false,
        notification: {
          message,
          open: true,
          variant: 'error'
        }
      });
    }
  }

  calculateBalance(data) {
    let rejectedCounter = 0;
    let approvedCounter = 0;
    let myBalance = 0;
    let myBalanceNo = 0;
    let myBalanceBanpais = 0;
    let myBalanceBAC = 0;

    data.map(payment => {
      const amountNumber = parseFloat(payment.amount.replace(',', '').split(' ')[1]);

      switch (payment.status) {
        case 'Flotante' ||'FLOATING':
          approvedCounter++;
          myBalance += amountNumber;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += amountNumber;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += amountNumber;
          }
          break;
        case 'Denegada' || 'DENIED':
          rejectedCounter++;
          myBalanceNo += amountNumber;
          break;
        case 'Cancelada' || 'CANCELED':
          rejectedCounter++;
          myBalanceNo += amountNumber;
          break;
        case 'Pagada' || 'PAYMENT':
          approvedCounter++;
          myBalance += amountNumber;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += amountNumber;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += amountNumber;
          }
          break;
        case 'Pendiente' || 'PENDING':
          approvedCounter++;
          myBalance += amountNumber;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += amountNumber;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += amountNumber;
          }
          break;
        default:
          break;
      }
      return payment;
    });

    this.setState({
      balanceNum: `L ${myBalance.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceNegative: `L ${myBalanceNo.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceBanpais: `L ${myBalanceBanpais.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceBAC: `L ${myBalanceBAC.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      rejectedCounter,
      approvedCounter
    });
  }

  processData(data) {
    let rejectedCounter = 0;
    let approvedCounter = 0;
    let myBalance = 0;
    let myBalanceNo = 0;
    let myBalanceBanpais = 0;
    let myBalanceBAC = 0;

    const dataSourceFormat = data.map(payment => {
      let status = '';

      switch (payment.status) {
        case 'FLOATING':
          approvedCounter++;
          myBalance += payment.amount;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += payment.amount;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += payment.amount;
          }
          status = 'Flotante';
          break;
        case 'DENIED':
          rejectedCounter++;
          myBalanceNo += payment.amount;
          status = 'Denegada';
          break;
        case 'CANCELED':
          rejectedCounter++;
          myBalanceNo += payment.amount;
          status = 'Cancelada';
          break;
        case 'PAYMENT':
          approvedCounter++;
          myBalance += payment.amount;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += payment.amount;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += payment.amount;
          }
          status = 'Pagada';
          break;
        case 'PENDING':
          approvedCounter++;
          myBalance += payment.amount;
          if (payment.processedBy === 'Banpaís') {
            myBalanceBanpais += payment.amount;
          }
          if (payment.processedBy === 'BAC') {
            myBalanceBAC += payment.amount;
          }
          status = 'Pendiente';
          break;
        default:
          break;
      }

      const cardCode = `${payment.paymentType || 'VISA'} ${
        payment.safeIdentifier
      }`;
      let accountLink = '';

      return {
        status,
        cardCode,
        emisor: 'BAC',
        id: payment._id,
        adq: 'Promerica',
        createdAt: dateTextFormat(payment.createdAt),
        accountName: accountLink,
        amount: `L ${payment.amount.toLocaleString(navigator.language, {
          minimumFractionDigits: 2
        })}`,
        processedBy: payment.processedBy,
        createdAtFormat : payment.createdAt
      };
    });

    this.setState({
      balanceNum: `L ${myBalance.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceNegative: `L ${myBalanceNo.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceBanpais: `L ${myBalanceBanpais.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      balanceBAC: `L ${myBalanceBAC.toLocaleString(navigator.language, {
        minimumFractionDigits: 2
      })}`,
      rejectedCounter,
      approvedCounter
    });

    this.setState({
      dataSourceFormat,
      dataSourceOriginal: dataSourceFormat,
      loading: false
    });
  }

  async getDataTransaction(payID) {
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      let { data } = await axios.get(
        `${baseURL}/payments/${payID}`,
        axiosConfig
      );
      this.setState({
        transactionObject: data,
        open: true
      });
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexión';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.setState({
        loading: false,
        notification: {
          message,
          open: true,
          variant: 'error'
        }
      });
    }
  }

  handleChange = e => {
    const value = e.target.value.toLowerCase();
    let filteredData = this.state.dataSourceOriginal;
    if (value !== '') {
      filteredData = filteredData.filter(payment =>
        payment.cardCode.toLowerCase().includes(value)
      );
      this.calculateBalance(filteredData);
      this.setState({
        dataSourceFormat: filteredData
      });
    } else
      this.calculateBalance(filteredData);
      this.setState({
        dataSourceFormat: filteredData
      });
  };

  componentDidMount() {
    myStartDate = startDateOf();
    myEndDate = endDateOf();
    this.getData();
  }

  getMuiTheme = () => TableFormat;

  render() {
    const {
      transactionObject,
      balanceBanpais,
      balanceBAC,
      balanceNum,
      balanceNegative,
      notification,
      dataSourceFormat,
      rejectedCounter,
      approvedCounter
    } = this.state;
    const { message, variant } = notification;
    const { classes } = this.props;

    const dataSourceC = dataSourceFormat.map(item => {
      return [
        item.cardCode,
        item.createdAt,
        item.amount,
        item.status,
        item.processedBy,
        item.id,
        item.createdAtFormat,
      ];
    });

    const columns = [
      {
        id: 'cardCode',
        numeric: false,
        disablePadding: true,
        label: 'TARJETA'
      },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'FECHA'
      },
      { id: 'amount', numeric: true, disablePadding: false, label: 'MONTO' },
      { id: 'status', numeric: false, disablePadding: false, label: 'ESTADO' },
      {
        id: 'processedBy',
        numeric: false,
        disablePadding: false,
        label: 'PROCESADO POR'
      },
      {
        name: 'DETALLE',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const dataTemp = tableMeta.rowData;

            return (
              <Tooltip title='Detalle'>
                <IconButton
                  style={{ padding: '1px 1px 1px 1px' }}
                  aria-label='Modify'
                  onClick={event => {
                    this.getDataTransaction(dataTemp[5]);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            );
          }
        }
      },
      {
        name: "DateFormat",
        options: {
          display: false,
        }
      },  
    ];

    return (
      <div>
        <Notifications
          message={message}
          variant={variant}
          className={classes.margin}
        />

        <Dialog
          open={this.state.open}
          onClose={this.onCloseModal}
          aria-labelledby='form-dialog-title'
          fullWidth={true}
          maxWidth='sm'
          style={{ width: '90%', height: '100%', margin: 'auto' }}
        >
          <DialogTitle disableTypography={false} id='form-dialog-title'>
            <h5 align='center'>
              <u>DETALLE DE TRANSACCIÓN</u>
            </h5>
          </DialogTitle>
          <DialogContent>
            {transactionObject.status && (
              <Grid container style={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                  <Grid zeroMinWidth={true} container justify='center'>
                    <Grid
                      style={{
                        height: '80%',
                        width: '25%',
                        margin: 5,
                        justify: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <br />
                      <ListItemText
                        primary='FECHA'
                        secondary={dateTextFormat(transactionObject.createdAt)}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='PROCESADO POR'
                        secondary={transactionObject.processedBy}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='ESTADO'
                        secondary={transactionObject.status}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='ID TRANSACCIÓN'
                        secondary={transactionObject.transactionID}
                        style={{ marginTop: 12 }}
                      />
                    </Grid>
                    <Grid
                      style={{
                        height: '80%',
                        width: '25%',
                        margin: 5,
                        justify: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <br />
                      <ListItemText
                        primary='MONTO'
                        secondary={`L ${transactionObject.amount.toLocaleString(
                          navigator.language,
                          { minimumFractionDigits: 2 }
                        )}`}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='SUBTOTAL'
                        secondary={`L ${transactionObject.subtotal.toLocaleString(
                          navigator.language,
                          { minimumFractionDigits: 2 }
                        )}`}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='IMPUESTO'
                        secondary={transactionObject.tax}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='DESCRIPCIÓN'
                        secondary={transactionObject.description}
                        style={{ marginTop: 12 }}
                      />
                    </Grid>
                    <Grid
                      style={{
                        height: '80%',
                        width: '25%',
                        margin: 5,
                        justify: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <br />
                      <ListItemText
                        primary='CLIENTE'
                        secondary={`${transactionObject.firstName} ${transactionObject.lastName}`}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='TARJETA'
                        secondary={transactionObject.safeIdentifier}
                        style={{ marginTop: 12 }}
                      />
                      <ListItemText
                        primary='EXPIRACIÓN DE TARJETA'
                        secondary={transactionObject.validThru}
                        style={{ marginTop: 12 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <DialogActions>
              <Button
                onClick={this.onCloseModal}
                color='primary'
                variant='contained'
                className={classes.button}
                style={{ marginTop: 10 }}
              >
                CERRAR
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          spacing={16}
          style={{
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'lightGray'
          }}
        >
          <Grid item xs sm={3}>
            <CardContent
              style={{
                borderRight: 'solid',
                borderWidth: 1,
                borderColor: '#ececec',
                padding: '-8px'
              }}
            >
              <Typography className={classes.cardTitle} gutterBottom>
                BALANCE APROBADAS
              </Typography>

              <Typography
                className={classes.primaryText}
                variant='h5'
                component='h2'
              >
                {balanceNum}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs sm={3}>
            <CardContent
              style={{
                borderRight: 'solid',
                borderWidth: 1,
                borderColor: '#ececec'
              }}
            >
              <Typography className={classes.cardTitle} gutterBottom>
                APROBADAS
              </Typography>

              <Typography
                className={classes.successText}
                variant='h5'
                component='h2'
              >
                {approvedCounter}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs sm={3}>
            <CardContent
              style={{
                borderRight: 'solid',
                borderWidth: 1,
                borderColor: '#ececec'
              }}
            >
              <Typography className={classes.cardTitle} gutterBottom>
                RECHAZADAS
              </Typography>

              <Typography
                className={classes.dangerText}
                variant='h5'
                component='h2'
              >
                {rejectedCounter}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs sm={3}>
            <CardContent>
              <Typography className={classes.cardTitle} gutterBottom>
                BALANCE RECHAZADAS
              </Typography>

              <Typography
                className={classes.dangerText}
                variant='h5'
                component='h2'
              >
                {balanceNegative}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        {
          <Grid
            container
            spacing={16}
            style={{
              backgroundColor: 'white',
              marginTop: 15,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'lightGray'
            }}
          >
            <Grid item xs>
              <CardContent
                style={{
                  borderRight: 'solid',
                  borderWidth: 1,
                  borderColor: '#ececec'
                }}
              >
                <Typography className={classes.cardTitle} gutterBottom>
                  BALANCE BANPAIS
                </Typography>

                <Typography
                  className={classes.successText}
                  variant='h5'
                  component='h2'
                >
                  {balanceBanpais}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs>
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom>
                  BALANCE CREDOMATIC
                </Typography>

                <Typography
                  className={classes.successText}
                  variant='h5'
                  component='h2'
                >
                  {balanceBAC}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        }
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            top: '60px'
          }}
        >
          <SearchBar placeholder='Buscar...' onChange={this.handleChange} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, top: '60px' }}>
          <Filter {...this.filterProps}></Filter>
        </div>
        <div style={{}}>
          <EnhancedTable title={''} data={dataSourceC} columns={columns} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Dashboard);
