import XLSX from 'xlsx';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { bold } from 'ansi-colors';
import styles from './stylesSubscriberDetail';
import CSVReader from 'react-csv-reader';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import { ExportSheet } from 'react-xlsx-sheet';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import blue from '@material-ui/core/colors/blue';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authHeader } from '../../../services/user';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ToastContainer, toast } from 'react-toastify';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { headers, baseURL } from '../../../services/request';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClientsListSuscribers from './../Subscribers/clientsListSuscribers';
import ProductsListSuscribers from './../Subscribers/productsListSuscribers';
import ProductsListSuscribersTable from './../Subscribers/productsListSuscribersTable';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const ClientsColumns = ['Tarjeta', 'Usuario', 'Email'];

const head = [
  { title: 'Nombre', dataIndex: 'firstName' },
  { title: 'Apellido', dataIndex: 'lastName' },
  { title: 'Direccion', dataIndex: 'address' },
  { title: 'Correo', dataIndex: 'email' },
  { title: 'Telefono', dataIndex: 'phone' },
  { title: 'No. Tarjeta', dataIndex: 'card' },
  { title: 'Fecha de vencimiento', dataIndex: 'date' }
];
const dataExampleExcel = [
  {
    firstName: 'Daniel',
    lastName: 'Lopez',
    address: 'Edificio El Faro',
    email: 'daniel26@gmail.com',
    phone: '87938765',
    card: '4000000000000002',
    date: '07/20'
  }
];

class SubscriberDetail extends React.Component {
  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.TOP_CENTER
    });
  };
  constructor(props) {
    super(props);
    this.id_c = '';

    this.state = {
      total: 0,
      totalClients: 0,
      totalClientsFile: 0,
      name: '',
      frequency: '',
      dataSourceFilesTemp: [],
      openFileDialog: false,
      blockButtonFile: true,
      valueRepeat: true,
      openClients: false,
      openClientsImport: false,
      openProducts: false,
      redirectToEdit: false,
      isNewSubscription: true,
      confirmSubscriber: false,
      successSubscriptions: false,
      dataSource: [],
      dataSourceTable: [],
      dataSourceClients: [],
      dataSourceTableClients: [],
      maximumDate: moment().format('YYYY-MM-DD'),
      executionDay: moment().format('YYYY-MM-DD'),
      selectedDate: moment().format('YYYY-MM-DD'),
      customerSelectedFilesImport: [],
      allRowsSelectedFiles: [],
      infoSubscribers: { ...this.props.location.dataSubscribers },
      numberFileCards: 0
    };
  }

  async getData() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },

      responseType: 'json'
    };

    try {
      const { data } = await axios.get(`${baseURL}/products`, axiosConfig);
      const dataSource = data.map(product => {
        const { price, name, _id, description, createdAt } = product;
        return { price, name, _id, description, createdAt };
      });

      this.setState({ dataSource });
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
  async getDataClients() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const { data } = await axios.get(
        `${baseURL}/customers?include=cards&include=issuer`,
        axiosConfig
      );

      const dataSourceClients = data.map(customer => {
        const {
          firstName,
          lastName,
          _id,
          createdAt,
          cards = [],
          email,
          address,
          mobileNumber
        } = customer;

        const dataCard = cards.map(card => {
          const { safeIdentifier, paymentType, _id } = card;
          const idCard = _id;
          const valCard = `${paymentType || 'VISA'} ${safeIdentifier}`;
          return { valCard, idCard };
        });

        return {
          firstName,
          lastName,
          _id,
          createdAt,
          dataCard,
          email,
          address,
          mobileNumber
        };
      });

      this.setState({ dataSourceClients });
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

  async getDataClientsImport() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const { data } = await axios.get(
        `${baseURL}/customers?include=cards&include=issuer`,
        axiosConfig
      );

      const dataSourceClients = data.map(customer => {
        const {
          firstName,
          lastName,
          _id,
          createdAt,
          cards = [],
          email,
          address,
          mobileNumber
        } = customer;

        const dataCard = cards.map(card => {
          const { safeIdentifier, paymentType, _id } = card;
          const idCard = _id;
          const valCard = `${paymentType || 'VISA'} ${safeIdentifier}`;
          return { valCard, idCard };
        });

        return {
          firstName,
          lastName,
          _id,
          createdAt,
          dataCard,
          email,
          address,
          mobileNumber
        };
      });

      this.setState({ dataSourceClients, openClientsImport: true });
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

  componentDidMount() {
    this.getData();
    this.getDataClients();
  }



  deleteProduct(productId){
    let filteredData = this.state.dataSourceTable;

    filteredData = filteredData.filter(payment =>
      !payment.id.includes(productId) 
    );

      this.setState({
        dataSourceTable: filteredData
      });
  }

  onOpenModal = () => {
    this.setState({ openProducts: true });
  };

  onCloseModal = () => {
    this.setState({ openProducts: false });
  };

  onOpenModalClients = () => {
    this.setState({ openClients: true });
  };

  ChangeSelectfrequency = event => {
    this.setState({ frequency: event.target.value });
  };

  handleChangeRadio = event => {
    if (event.target.value === 'Si') {
      this.setState({ valueRepeat: true });
    }
    if (event.target.value === 'No') {
      this.setState({ valueRepeat: false });
    }
  };

  handleChangeDate = event => {
    this.setState({ executionDay: event.target.value });
  };

  handleChangeMaximumDate = event => {
    this.setState({ maximumDate: event.target.value });
  };

  returnDetail = tableResult => {
    const dataSourceTemp = [...tableResult];
    let total = 0;
    dataSourceTemp.forEach(element => {
      total += element.price;
    });
    this.setState({
      openProducts: false,
      dataSourceTable: [...dataSourceTemp],
      total: total
    });
  };
  returnDetailClients = (tableResultC, selectRowsIndex) => {
    const dataSourceTemp = [...tableResultC];
    this.setState({
      openClients: false,
      openClientsImport: false,
      dataSourceTableClients: dataSourceTemp,
      totalClients: dataSourceTemp.length,
      allRowsSelectedFiles: selectRowsIndex
    });
  };
  returnClientsClose = () => {
    this.setState({ openClients: false });
  };

  returnClientsCloseImport = () => {
    this.setState({ openClientsImport: false });
  };

  returnProductsClose = () => {
    this.setState({ openProducts: false });
  };

  handleInputChange(e) {
    this.setState({
      total: e.target.value
    });
  }

  handleInputSubscriptionName(e) {
    this.setState({ name: e.target.value });
  }

  sendSuscriber = async () => {
    const {
      name,
      frequency,
      maximumDate,
      valueRepeat,
      executionDay,
      dataSourceTable,
      dataSourceTableClients
    } = this.state;

    let totalPayment = 0;
    dataSourceTable.map(product => {
      totalPayment += product.price;
      return totalPayment;
    });

    const customersDataSource = dataSourceTableClients.map(item => {
      return { customerID: item.id, cardID: item.idCard };
    });

    const productDataSource = dataSourceTable.map(item => {
      return item.id;
    });

    const subscriberData = {
      name,
      amount: new Intl.NumberFormat('es-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(totalPayment),
      frequency,
      monthlyRepeat: valueRepeat,
      products: productDataSource,
      customers: customersDataSource,
      status:'PENDIENTE',
      maximumDate: moment(maximumDate, 'YYYY-MM-DD').unix(),
      executionDay: moment(executionDay, 'YYYY-MM-DD').unix()
    };

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.post(
        `${baseURL}/subscriptions`,
        subscriberData,
        axiosConfig
      );

      const { data } = response;

      this.notifySuccess('Subscripcion creada exitosamente');

      this.setState({
        data,
        submitted: false,
        sendButtonDisabled: false,
        redirectToEdit: true,
        successSubscriptions: true
      });
    } catch (error) {
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        data: error
      });
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
    }
  };
  onOpenFilesDialog = () => {
    this.setState({ openFileDialog: true });
  };

  onCloseFilesDialog = () => {
    this.setState({ openFileDialog: false, blockButtonFile: true });
  };

  returnFileData = data => {
    if (data.length < 1) {
      this.notifyError('Documento Vacio');
      this.setState({ blockButtonFile: true, openFileDialog: false });
    } else {
      data[0] = '';
      var index = 0;
      data.splice(index, 1);

      let clients = data.map(element => {
        let Cards = element[5],
          separador = ';',
          customerCardsSafe = Cards.split(separador);

        let CardsValid = element[6],
          customerCardsValid = CardsValid.split(separador);

        return {
          firstName: element[0],
          lastName: element[1],
          address: element[2],
          email: element[3],
          mobileNumber: element[4],
          safeIdentifier: customerCardsSafe,
          validThru: customerCardsValid
        };
      });

      let clients_firstNames = [];
      let clients_lastNames = [];
      let clients_address = [];
      let clients_mobile = [];
      let clients_validThru = [];
      let clients_safeIdentifier = [];
      let clients_email = [];
      for (let i = 0; i < clients.length; i += 1) {
        if (typeof clients[i].email == 'undefined') {
          this.notifyWarn('Revisar campo de correo');
        } else {
          clients_firstNames.push(clients[i].firstName);
          clients_lastNames.push(clients[i].lastName);
          clients_safeIdentifier.push(clients[i].safeIdentifier);
          clients_validThru.push(clients[i].validThru);
          clients_email.push(clients[i].email);
          clients_address.push(clients[i].address);
          clients_mobile.push(clients[i].mobileNumber);
        }
      }

      if (clients_firstNames.includes('')) {
        this.notifyError(
          'Uno de los clientes importados tienen el campo de primer nombre vacio'
        );
        this.setState({ blockButtonFile: true, openFileDialog: false });
      }
      if (clients_lastNames.includes('')) {
        this.notifyError(
          'Uno de los clientes importados tienen el campo de apellido vacio'
        );
        this.setState({ blockButtonFile: true, openFileDialog: false });
      }
      if (clients_safeIdentifier.includes('')) {
        this.notifyError(
          'Uno de los clientes importados tienen el campo de tarjeta vacio'
        );
        this.setState({ blockButtonFile: true, openFileDialog: false });
      }

      if (clients_validThru.includes('')) {
        this.notifyError(
          'Uno de los clientes importados tienen el campo de expiracion de tarjeta vacio'
        );
        this.setState({ blockButtonFile: true, openFileDialog: false });
      }

      if (
        !clients_firstNames.includes('') &&
        !clients_lastNames.includes('') &&
        !clients_safeIdentifier.includes('') &&
        !clients_validThru.includes('')
      ) {
        this.notifySuccess('Documento en formato correcto');
        this.setState({
          dataSourceFilesTemp: { ...clients },
          blockButtonFile: false,
          totalClientsFile: data.length
        });
      }
    }
  };

  errorFileData = () => {
    this.notifyError('Error formato invalido de archivo');
  };
  onOpenModalClientsFiles = () => {
    this.setState({
      openFileDialog: false,
      totalClients: this.state.totalClients
    });
    let customerSelectTemp = [];
    let allRowsSelectTempImport = [];
    for (let i = 0; i < this.state.totalClientsFile; i += 1) {
      customerSelectTemp[i] = i;
      allRowsSelectTempImport[i] = { index: i, dataIndex: i };
      this.sendCustomers(
        this.state.dataSourceFilesTemp[i],
        i,
        customerSelectTemp,
        allRowsSelectTempImport
      );
    }
  };

  sendCustomers = async (
    values,
    position,
    selectedCustomers,
    allRowsSelectTempImport
  ) => {
    const axiosBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      address: values.address,
      mobileNumber: values.mobileNumber
    };
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.post(
        `${baseURL}/customers`,
        axiosBody,
        axiosConfig
      );
      const { data } = response;

      let totalCards = values.safeIdentifier.length;
      const { numberFileCards } = this.state;

      if (totalCards > 1 && numberFileCards >= 0) {
        this.sendCard(
          this.state.dataSourceFilesTemp[position],
          data._id,
          values.safeIdentifier[numberFileCards],
          values.validThru[numberFileCards],
          totalCards
        );
      } else {
        this.sendCard(
          this.state.dataSourceFilesTemp[position],
          data._id,
          values.safeIdentifier[0],
          values.validThru[0]
        );
      }

      this.setState({
        customerSelectedFilesImport: [...allRowsSelectTempImport],
        allRowsSelectedFiles: [...selectedCustomers]
      });
    } catch (error) {
      this.setState({ submitted: false, sendButtonDisabled: false });
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
    }
  };

  sendCard = async (values, _id, safeData, validData, totalCards) => {
    const axiosBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      safeIdentifier: safeData,
      validThru: validData
    };

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.post(
        `${baseURL}/customers/${_id}/cards`,
        axiosBody,
        axiosConfig
      );

      if (totalCards > 1) {
        this.setState({ numberFileCards: this.state.numberFileCards + 1 });
        if (totalCards === this.state.numberFileCards) {
          this.notifySuccess('Tarjetas agregadas correctamente');
          this.setState({ numberFileCards: 0 });
          this.getDataClientsImport();
        } else {
          this.sendCard(
            values,
            _id,
            values.safeIdentifier[this.state.numberFileCards],
            values.validThru[this.state.numberFileCards],
            totalCards
          );
        }
      }
      this.getDataClientsImport();

      const { data } = response;
      this.setState ({data: data});
    } catch (error) {
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
      }
      this.notifyError(message);
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        errorTrace: message
      });
    }
  };

  render() {
    const {
      infoSubscribers,
      dataSource,
      dataSourceTable,
      dataSourceClients,
      successSubscriptions
    } = this.state;

    let totalPayment = 0;
    dataSourceTable.map(product => {
      totalPayment += product.price;
      return totalPayment;
    });

    this.id_c = infoSubscribers._id;
    const { classes } = this.props;
    if (successSubscriptions)
      return (
        <Redirect
          to={{
            pathname: '/panel/subscribers'
          }}
        />
      );
      const productsColumns2 = ['Nombre', 'Descripcion', 'Precio'];
      const productsColumns = [

        { id: 'name', numeric: true, disablePadding: false, label: 'NOMBRE' },
        { id: 'description', numeric: false, disablePadding: false, label: 'DESCRIPCION' },
        { id: 'price', numeric: false, disablePadding: false, label: 'PRECIO' },
      
        {
          name: 'ELIMINAR',
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              const dataTemp = tableMeta.rowData;
      
              return (
                <Tooltip title='Eliminar'>
                  <IconButton
                    style={{ padding: '1px 1px 1px 1px' }}
                    aria-label='Delete'
                    onClick={event => {
                      this.deleteProduct(dataTemp[3]);
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
        <Dialog
          open={this.state.openFileDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            OPCIONES DE IMPORTACION DE CLIENTES
          </DialogTitle>
          <DialogContent>
            <div>
              <b>PASO 1: DESCARGAR ARCHIVO DE EJEMPLO</b>
              <ExportSheet
                header={head}
                fileName={`Paygate`}
                dataSource={dataExampleExcel}
                xlsx={XLSX}
              >
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                >
                  Descargar Ejemplo
                </Button>
              </ExportSheet>
            </div>
            <br></br>
            <b>PASO 2: IMPORTAR ARCHIVO</b>
            <br></br>
            <div>
              <br></br>
              <CSVReader
                cssClass='csv-reader-input'
                label='Selecciona un archivo en formato CSV '
                onFileLoaded={this.returnFileData}
                onError={this.errorFileData}
                inputId='csv'
                inputStyle={{ color: 'red' }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseFilesDialog} color='primary'>
              CANCELAR
            </ButtonModal>
            <ButtonModal
              onClick={this.onOpenModalClientsFiles}
              disabled={this.state.blockButtonFile}
              color='primary'
            >
              CONTINUAR
            </ButtonModal>
          </DialogActions>
        </Dialog>
        <Typography component={'span'} color='textSecondary' gutterBottom />
        <Card>
          <CardHeader
            action={<Grid item xs></Grid>}
            title='SELECCIONAR CLIENTES'
            subheader=''
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs>
                <label
                  id='labelSubscriberName'
                  className={classes.labelSubscriberName}
                >
                  NOMBRE DE LA SUSCRIPCION:
                </label>
              </Grid>
              <Grid item xs>
                <TextField
                  autoFocus={true}

                  margin='normal'
                  required
                  id='textFieldSubscriptionName'
                  type='text'
                  defaultValue={this.state.name}
                  value={this.state.name}
                  InputProps={{ disableUnderline: false }}
                  onChange={e => this.handleInputSubscriptionName(e)}
                  className={classes.textFieldSubscriptionName}
                />
              </Grid>
              <Grid item xs></Grid>
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs>
                    {' '}
                    <label className={classes.customerName}>
                      CLIENTES: {this.state.totalClients}
                    </label>
                  </Grid>
                  <Grid item xs>
                    <Tooltip
                      title='Agregar Clientes a la subscripcion'
                      aria-label='Add'
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        className={classes.paperAdd}
                        style={{
                          backgroundColor: blue[800],
                          color: 'white',
                          font: bold,
                          borderRadius: '30px'
                        }}
                        onClick={this.onOpenModalClients}
                      >
                        + AGREGAR
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item xs>
                  </Grid>
                  <Grid item xs>
                    <Tooltip title='Importar subscripcion' aria-label='Add'>
                      <Button
                        variant='contained'
                        color='default'
                        className={classes.paperAdd}
                        style={{
                          backgroundColor: 'Orange',
                          color: 'white',
                          font: bold,
                          borderRadius: '30px'
                        }}
                        onClick={this.onOpenFilesDialog}
                      >
                        IMPORTAR
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions />
        </Card>
        <br />
        <div>
          <ClientsListSuscribers
            title={'Clientes'}
            dataSourceClients={dataSourceClients}
            columns={ClientsColumns}
            openClients={this.state.openClients}
            openClientsImport={this.state.openClientsImport}
            allRowSelectedCustomersIndex={this.state.allRowsSelectedFiles}
            allRowSelectedCustomersIndexImport={
              this.state.customerSelectedFilesImport
            }
            onConfirmTableClients={this.returnDetailClients}
            onCloseTableClients={this.returnClientsClose}
            onCloseTableClientsImport={this.returnClientsCloseImport}
          />
          <ProductsListSuscribers
            title={'Productos'}
            dataSource={dataSource}
            columns={productsColumns2}
            openProducts={this.state.openProducts}
            onConfirmTable={this.returnDetail}
            onCloseTableProducts={this.returnProductsClose}
          />
        </div>
        <Card>
          <CardHeader
            action={
              <Grid item xs>
                <Tooltip
                  title='Agregar productos a la subscripcion'
                  aria-label='Add'
                >
                  <Button
                    variant='contained'
                    className={classes.paperProduct}
                    onClick={this.onOpenModal}
                    style={{
                      backgroundColor: 'white',
                      color: 'primary',
                      font: bold
                    }}
                  >
                    AGREGAR PRODUCTOS
                  </Button>
                </Tooltip>
              </Grid>
            }
            title='PRODUCTOS'
            subheader=''
          />
          <Divider />
          <CardContent>
            <ProductsListSuscribersTable
              title={'Productos'}
              dataSourceTable={dataSourceTable}
              columns={productsColumns}
            />
            <Grid container>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
                <br />
              </Grid>
              <br />
              <Grid item sm xs>
                <br />
                <label style={{ color: 'primary', fontSize: 14 }}>
                  {' '}
                  MONTO A COBRAR
                </label>
                <br />
                <br />
                <Paper className={classes.root} elevation={1}>
                  <div className={classes.valueLps} aria-label='Menu'>
                    <label
                      style={{ color: 'primary', font: bold, fontSize: 18 }}
                    >
                      L.
                      {new Intl.NumberFormat('es-US', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      }).format(totalPayment)}
                    </label>
                  </div>

                  <Divider className={classes.divider} />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions />
        </Card>
        <br />
        <div>
          <Card>
            <CardHeader title='PROGRAMACION' subheader='' />
            <Divider />
            <CardContent>
              <label className='texto-frec2'>
                Intervalo(la frecuencia con la que se hara el cargo)
              </label>
              <br />
              <Grid item xs>
                <Paper className={classes.paperFrec}>
                  <FormControl className={classes.formControl}>
                    <NativeSelect
                      className='nativefr'
                      onChange={this.ChangeSelectfrequency}
                      disableUnderline
                      input={
                        <Input
                          name='frequency'
                          id='age-native-label-placeholder'
                        />
                      }
                    >
                      <option value='Seleccionar'>Seleccionar</option>
                      <option value={'DIARIO'}>Diario</option>
                      <option value={'SEMANAL'}>Semanal</option>
                      <option value={'MENSUAL'}>Mensual</option>
                    </NativeSelect>
                  </FormControl>
                </Paper>
              </Grid>
              <br />
              <br />
              <label>Fecha Inicial</label>
              <Grid item xs>
                <Paper className={classes.paperDate}>
                  <form className={classes.formControlDate} noValidate>
                    <TextField
                      id='executionDay'
                      type='date'
                      onChange={this.handleChangeDate}
                      defaultValue={moment(
                        this.state.executionDay,
                        'YYYY-MM-DD'
                      )
                        .add(1, 'days')
                        .format('YYYY-MM-DD')}
                      className={classes.textField}
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                </Paper>
              </Grid>
              <br />
              <br />
              <label>Fecha Final </label>
              <Grid item xs>
                <Paper className={classes.paperDate}>
                  <form className={classes.formControlDate} noValidate>
                    <TextField
                      id='maximumDate'
                      type='date'
                      onChange={this.handleChangeMaximumDate}
                      defaultValue={moment(
                        moment(this.state.maximumDate, 'YYYY-MM-DD')
                          .add(1, 'days')
                          .add(1, 'years')
                      ).format('YYYY-MM-DD')}
                      className={classes.textField}
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </form>
                </Paper>
              </Grid>
              <br />
              <FormControl className={classes.formControl} component='fieldset'>
                <br />
                <label>Repetir todos los meses</label>
                <br />
                <RadioGroup
                  className='rbutton'
                  aria-label='position'
                  name='position'
                  onChange={this.handleChangeRadio}
                  row
                  defaultValue='Si'
                >
                  <FormControlLabel
                    value='Si'
                    control={<Radio color='primary' />}
                    label='Si'
                    labelPlacement='start'
                  />
                  <FormControlLabel
                    value='No'
                    control={<Radio color='primary' />}
                    label='No'
                    labelPlacement='start'
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
            <Grid container>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs>
                <label />
              </Grid>
              <Grid item sm xs />
              <Grid>
                <Tooltip title='Agregar Subscripcion' aria-label='Add'>
                  <Button
                    variant='contained'
                    onClick={this.sendSuscriber}
                    style={{
                      backgroundColor: 'white',
                      color: 'primary',
                      padding: '10px',
                      margin: '10px'
                    }}
                  >
                    {' '}
                    AGREGAR SUSCRIPCION
                  </Button>
                </Tooltip>
                <ToastContainer />
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SubscriberDetail);
