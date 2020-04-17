import axios from 'axios';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../../services/user';
import { ToastContainer, toast } from 'react-toastify';
import { headers, baseURL } from '../../../services/request';
import {withStyles} from '@material-ui/core/styles';
import ProductDetailCardHeader from './productDetailCardHeader';
import ProductDetailCardDetail from './productDetailCardDetail';
import ProductDetailDialogDetail from './productDetailDialogDetail';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class ProductDetail extends React.Component {
  toastId = null;

  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  constructor(props) {
    super(props);
    this.id_c = '';

    this.state = {
      infoProducts: {}
    };
  }

  updateProduct = async axiosBody => {
    const { _id } = this.state.infoProducts;

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.put(
        `${baseURL}/products/${_id}`,
        axiosBody,
        axiosConfig
      );
      const { data } = response;

      this.notifySuccess('Producto modificado con exito');
      this.setState({
        data: data,
        submitted: false,
        sendButtonDisabled: false,
        abrirDetalle: false,
        reload: true
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

  onSubmitDetail = e => {
    e.preventDefault();
    const target = e.currentTarget;
    const infoProducts = {
      name: target.name.value,
      description: target.description.value,
      price: target.price.value
    };
    if (this.onValidateSendInfoDetail(infoProducts)) {
      this.updateProduct(infoProducts);
    }
  };

  onOpenModal = () => {
    let infoProducts = this.state.infoProducts;
    this.setState({
      name: infoProducts.name,
      description: infoProducts.description,
      price: infoProducts.price,
      abrirDetalle: true
    });
  };

  onCloseModal = () => {
    this.setState({ abrirDetalle: false });
  };

  onValidateSendInfoDetail = pinfoProduct => {
    if (pinfoProduct.name.length < 1) {
      this.notifyError('El campo de nombre esta vacio');
      return;
    }
    if (pinfoProduct.description.length < 1) {
      this.notifyError('El campo de descripcion esta vacio');
      return;
    }
    if (pinfoProduct.price.length < 1) {
      this.notifyError('El campo de precio esta vacio');
      return;
    }
    return true;
  };

  async getDataProduct() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    const { id } = this.props.match.params;
    try {
      const { data } = await axios.get(
        `${baseURL}/products/${id}`,
        axiosConfig
      );
      this.setState({
        infoProducts: { ...data }
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
          variant: 'error'
        }
      });
      this.notifyError(message);
    }
  }

  componentDidMount() {
    this.getDataProduct();
  }

  render() {
    const { infoProducts, reload } = this.state;
    this.id_c = infoProducts._id;
    const { classes } = this.props;

    if (reload) {
      window.location.reload();
    }
    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <ProductDetailCardHeader
                classes={classes}
                infoProducts={infoProducts}
              />
            </Paper>
            <br />
            <Paper>
              <ProductDetailCardDetail
                openModalDetail={this.onOpenModal}
                infoProducts={infoProducts}
              />
            </Paper>
            <ProductDetailDialogDetail
              Transition={Transition}
              openDetail={this.state.abrirDetalle}
              onSubmitDetail={this.onSubmitDetail}
              onCloseModal={this.onCloseModal}
              dataSource={infoProducts}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(withStyles)(ProductDetail);
