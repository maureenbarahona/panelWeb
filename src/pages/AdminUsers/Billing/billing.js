import axios from 'axios';
import style from './style.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import BillingForm from './billingForm';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { authHeader } from '../../../services/user';
import BillingCardHeader from './billingCardHeader';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import BillingSummaryTable from './billingSummaryTable';
import { headers, baseURL } from '../../../services/request';
import {formatExpirationDate} from '../../../utils/utilsCard';
import BillingDialogAddProduct from './billingDialogAddProduct';
import BillingDialogModifyProduct from './billingDialogModifyProduct';


function Transition(props) {
  return <Slide direction='up' {...props} />;
}
class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termsConditions: false,
      redirectToConfirmation:false,
      totalPayment: 0,
      productsData: [],
      billingId:[],
      productObject: {
        name: '',
        quantity: '',
        priceFormat: '',
        price: ''
      },
      positionModify: '',
      open: false,
      open2: false,
      sendButtonDisabled: false,
      sendButtonDisabled2: false
    };
  }

  calculatePayment = productsData => {
    let totalPrice = 0;
    productsData.map(product => {
      totalPrice = Number(totalPrice) + Number(product[1]) * Number(product[3]);
      return totalPrice;
    });

    this.setState({
      totalPayment: totalPrice
    });
    return;
  };

  addProduct = e => {
    e.preventDefault();
    const target = e.currentTarget;
    let productObject = {
      name: target.name.value,
      quantity: target.quantity.value,
      price: target.price.value
    };
    const { productsData } = this.state;

    if (productObject.name && productObject.quantity && productObject.price) {
      const priceFormat = `L. ${new Intl.NumberFormat('es-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(productObject.price)}`;
      productObject.priceFormat = priceFormat;
      let newProductsData = productsData;
      newProductsData.push([
        productObject.name,
        productObject.quantity,
        productObject.priceFormat,
        productObject.price,
        productObject.name,
        '15'
      ]);
      this.calculatePayment(newProductsData);
      this.setState({
        productsData: newProductsData,
        open: false
      });
    } else this.notifyWarn('Debes llenar todos los campos');
  };

  modifyProduct = e => {
    e.preventDefault();
    const target = e.currentTarget;
    let productObject = {
      name: target.name.value,
      quantity: target.quantity.value,
      price: target.price.value
    };
    const { productsData, positionModify } = this.state;

    if (productObject.name && productObject.quantity && productObject.price) {
      let dataTemp = productsData;
      const priceFormat = `L. ${new Intl.NumberFormat('es-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(productObject.price)}`;

      dataTemp[positionModify][0] = productObject.name;
      dataTemp[positionModify][1] = productObject.quantity;
      dataTemp[positionModify][2] = priceFormat;
      dataTemp[positionModify][3] = productObject.price;
      dataTemp[positionModify][4] = productObject.name;
      dataTemp[positionModify][5] = '15';
      this.calculatePayment(dataTemp);
      this.setState({
        productsData: dataTemp,
        positionModify: '',
        open2: false
      });
    } else this.notifyWarn('Debes llenar todos los campos');
  };

  deleteProduct = positionDelete => {
    let dataTemp = this.state.productsData;
    dataTemp.splice(positionDelete, 1);
    this.calculatePayment(dataTemp);
    this.setState({
      productsData: dataTemp
    });
  };
  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };
  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.TOP_CENTER
    });
  };
  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  handleCheckBox = event => {
    const target = event.target;
    const value = target.checked;
    this.setState({ termsConditions: value });
  };

  onOpenModal = () => {
    this.setState({
      positionModify: '',
      sendButtonDisabled2: false,
      open: true
    });
  };

  onOpenModal2 = positionModify => {
    const dataTemp = this.state.productsData;
    const productObject = {
      name: dataTemp[positionModify][0],
      quantity: dataTemp[positionModify][1],
      priceFormat: dataTemp[positionModify][2],
      price: dataTemp[positionModify][3]
    };
    this.setState({
      productObject,
      positionModify,
      sendButtonDisabled2: false,
      open2: true
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  onCloseModal2 = () => {
    this.setState({
      positionModify: '',
      sendButtonDisabled2: false,
      open2: false
    });
  };

  sendForm = async formObject => {
    let { totalPayment, productsData } = this.state;

    let firstName = '';
    let lastName = '';
    let nameArray = formObject.nameForm2.split(' ');
    //let dateArray = formObject.validTrhuForm.split('-');
    //let dateTemp = dateArray[0].substr(2, 2);

    let validTrhuForm = formObject.validTrhuForm; //dateArray[1] + '/' + dateTemp;
    if (nameArray.length === 1) {
      firstName = nameArray[0];
    }
    if (nameArray.length > 1) {
      firstName = nameArray[0];
      lastName = nameArray[1];
    }
    let productArray = [];
    productsData.map(product => {
      productArray.push({
        tax: product[5],
        price: product[3],
        quantity: product[1],
        name: product[0],
        description: product[4]
      });
      return productsData;
    });

    this.setState({ submitted: true, sendButtonDisabled: true });

    const axiosBody = {
      cvv: formObject.cvvForm,
      email: formObject.emailForm,
      name: formObject.nameForm1,
      phoneNumber: `${'+504'}${formObject.phoneNumberForm}`,
      firstName: firstName,
      lastName: lastName,
      description: 'description',
      safeIdentifier: `${formObject.safeIdentifierForm}`,
      amount: Number(
        new Intl.NumberFormat('es-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }).format(totalPayment)
      ),
      tax: 0,
      validThru: validTrhuForm,
      products: productArray
    };
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      const response = await axios.post(`${baseURL}/orderPayment`, axiosBody, axiosConfig);

      const { data } = response;

      //console.log(data);
      //console.log(`${baseURL}/orderPayment`);
      //console.log(axiosBody);
      

      this.setState({
        billingId: data._id,
        termsConditions: false,
        totalPayment: 0,
        productsData: [],
        submitted: false,
        sendButtonDisabled: false,
        redirect: true,
        redirectToConfirmation:true,
      });
      this.notifySuccess('¡Compra realizada con éxito!');


    } catch (error) {
      this.setState({ submitted: false, sendButtonDisabled: false });
      const { response } = error;
      let message = 'Error de conexion';
      if (response) {
        const { data } = response;
        message = data.message;
        if (message === 'El safeIdentifier debe ser un string') {
          message = 'Número de tarjeta inválido';
        }
        if (message === 'safeIdentifier must be at least 8 characters') {
          message = 'Número de tarjeta inválido';
        }
        if (message === 'DENIED T') {
          message = 'La tarjeta que ingreso no cuenta con saldo disponible!';
        }
      }
      this.notifyError('Hubo un error: ' + message);
    }
  };

  handleExpiry = ({ target }) => {
      target.value = formatExpirationDate(target.value);
    this.setState({ [target.name]: target.value });
  };

  handleSubmitValidation = e => {
    e.preventDefault();
    const target = e.currentTarget;
    let formObject = {
      phoneNumberForm: target.phoneNumberForm.value,
      cvvForm: target.cvvForm.value,
      safeIdentifierForm: target.safeIdentifierForm.value,
      validTrhuForm: target.validTrhuForm.value,
      nameForm1: target.nameForm1.value,
      nameForm2: target.nameForm2.value,
      emailForm: target.emailForm.value
    };
    let { termsConditions, productsData } = this.state;
    if (
      !formObject.phoneNumberForm ||
      !formObject.cvvForm ||
      !formObject.safeIdentifierForm ||
      !formObject.validTrhuForm ||
      !formObject.nameForm1 ||
      !formObject.nameForm2 ||
      !formObject.emailForm ||
      !termsConditions
    ) {
      this.notifyWarn(
        'Debes llenar correctamente los campos del formulario para relizar una compra!'
      );
    } else {
      if (productsData.length === 0) {
        this.notifyWarn(
          'Debes agregar al menos un producto para realizar una compra!'
        );
      } else {
        this.sendForm(formObject);
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { productObject, productsData } = this.state;
    const columnsTable = [
      { id: 'name', numeric: false, disablePadding: true, label: 'NOMBRE' },
      {
        id: 'quantity',
        numeric: false,
        disablePadding: true,
        label: 'CANTIDAD'
      },

      { id: 'price', numeric: false, disablePadding: false, label: 'PRECIO' },
      {
        name: 'MODIFICAR',
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const modifyIndex = tableMeta.rowIndex;
            return (
              <Tooltip title='Modificar'>
                <IconButton
                  aria-label='Modify'
                  onClick={event => {
                    this.onOpenModal2(modifyIndex);
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
            const deleteIndex = tableMeta.rowIndex;
            return (
              <Tooltip title='Eliminar'>
                <IconButton
                  aria-label='Delete'
                  onClick={event => {
                    this.deleteProduct(deleteIndex);
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
      <div style={{flexGrow: 1}}>
        <div>
          <ToastContainer />
        </div>
        <Grid container  style={{flexGrow: 1}}>
          <Grid item xs={12}>
            <Paper>
              <BillingCardHeader
                classes={classes}
                onOpenModal={this.onOpenModal}
              />
            </Paper>
            <br />
            <Paper>
              <BillingDialogAddProduct
                Transition={Transition}
                openDetail={this.state.open}
                onCloseModal={this.onCloseModal}
                addProduct={this.addProduct}
              />
            </Paper>
            <Paper>
              <BillingDialogModifyProduct
                Transition={Transition}
                openDetail={this.state.open2}
                onCloseModal={this.onCloseModal2}
                modifyProduct={this.modifyProduct}
                productObject={productObject}
              />
            </Paper>
            <Paper>
              <BillingSummaryTable
                productsData={productsData}
                totalPayment={this.state.totalPayment}
                columnsTable={columnsTable}
              />
            </Paper>
            <br />
            <Paper>
              <BillingForm
              classes={classes}
              handleSubmitValidation={this.handleSubmitValidation}
              termsConditions={this.state.termsConditions}
              handleCheckBox={this.handleCheckBox}
              sendButtonDisabled={this.state.sendButtonDisabled}
              handleExpiry={this.handleExpiry}
              />
            </Paper>
           </Grid>
        </Grid>
        {this.state.redirectToConfirmation &&
          <Redirect push
            to={{
              pathname: `/panel/BillingConfirmation/${this.state.billingId}`,
            }}
          />
        }
      </div>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Billing);
