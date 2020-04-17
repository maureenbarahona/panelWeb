import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from '@material-ui/core/TableRow';
import ButtonModal from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { authHeader } from '../../../services/user';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { ToastContainer, toast } from 'react-toastify';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { headers, baseURL } from '../../../services/request';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import DialogContentText from '@material-ui/core/DialogContentText';
import TableHeader from '../../../components/Container/Header/TableHeader';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

class ProductsList extends Component {
  isSelected = id => this.state.selected.indexOf(id) !== -1;

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
      position: toast.POSITION.TOP_CENTER,
      autoClose: false
    });
  };

  state = {
    order: 'desc',
    orderBy: 'createdAt',
    selected: [],
    data: [],
    clicks: 0,
    redirectToEdit: false,
    reload: false,
    openOptions: false,
    confirmProduct: false,
    getProducts: {
      _id: '',
      name: '',
      description: '',
      price: '',
      createdAt: ''
    },
    page: 0,
    rowsPerPage: 10
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  deleteProduct = async values => {

    const { _id } = this.state.getProducts;
   
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const response = await axios.delete(
        `${baseURL}/products/${_id}`,
        axiosConfig
      );
      const { data } = response;
      this.notifySuccess('Producto eliminado exitosamente');
      this.getData();
      this.setState({
        data: data,
        submitted: false,
        sendButtonDisabled: false,
        openOptions: false,
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
          variant: 'error'
        }
      });
      this.notifyError(message);
    }
  }

  handleTableClick = (event, id, name, description, price, date, cell) => {

    this.setState({ clicks: this.state.clicks + 1 });
    if (this.state.clicks === 1) {
      this.setState({
        clicks: 0,
        redirectToEdit: true,
        getProducts: {
          _id: id,
          name: name,
          description: description,
          price: price,
          createdAt: date
        }
      });
    }
  };

  onOpenProduct = () => {

    this.setState({ openOptions: false, redirectToEdit: true });
  };

  onDelete = () => {
    this.deleteProduct(this.state.getProducts);
  };

  onCloseOptions = () => {
    this.setState({ openOptions: false });
  };

  onCloseProduct = () => {
    this.setState({ confirmProduct: false, openOptions: false, reload: true });
  };

  onOpenOptions = (event, item) => {
    const {id, name, description, price, date} = item
    this.setState({
      openOptions: true,
      getProducts: {
        _id: id,
        name: name,
        description: description,
        price: price,
        createdAt: date
      }
    });
  };

  render() {
    const { classes, columns, dataSource } = this.props;

    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      redirectToEdit,
      getProducts,
      reload
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, dataSource.length - page * rowsPerPage);

    if (redirectToEdit)
      return (
        <Redirect push
          to={{
            pathname: `/panel/productDetail/${getProducts._id}`,
          }}
        />
      );

    if (reload) {
      window.location.reload();
    }

    return (
      <Paper className={classes.root}>
        <ToastContainer />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHeader
              order={this.order}
              orderBy={this.orderBy}
              onRequestSort={this.handleRequestSort}
              columns={columns}
            />
            <TableBody>
              {stableSort(dataSource, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(products => {
                  const isSelected = this.isSelected(products._id);
                  return (
                    <TableRow
                      hover
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={products._id}
                      selected={isSelected}
                      onClick={event =>
                        this.handleTableClick(
                          event,
                          products._id,
                          products.name,
                          products.description,
                          products.price,
                          products.createdAt
                        )
                      }
                    >
                      <TableCell component='th' scope='row'>
                        {products.name}
                      </TableCell>
                      <TableCell align='left'>{products.description}</TableCell>
                      <TableCell align='right'>
                        {'L.' + products.price}
                      </TableCell>
                      <TableCell>
                        {moment(products.createdAt).format(
                          'DD MMMM YYYY hh:mm a'
                        )}
                      </TableCell>
                      <TableCell
                        onClick={event =>
                          this.onOpenOptions(
                            event,
                            products._id,
                            products.name,
                            products.description,
                            products.price,
                            products.createdAt
                          )
                        }
                      >
                        <Fab
                          disabled
                          aria-label='Delete'
                          className={classes.fab}
                        >
                          <DeleteIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 1 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Dialog
            open={this.state.openOptions}
            onClose={this.onCloseOptions}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title'>
              OPCIONES DEL PRODUCTO
            </DialogTitle>
            <DialogContent>¿DESEAS BORRAR ESTE PRODUCTO?</DialogContent>
            <DialogActions>
              <ButtonModal onClick={this.onCloseOptions} color='primary'>
                NO
              </ButtonModal>

              <ButtonModal onClick={this.onDelete} color='primary'>
                SI
              </ButtonModal>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.confirmProduct}
            onClose={this.onCloseProduct}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title2'>PRODUCTO BORRADO </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Se ha borrado la informacion del producto exitosamente.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonModal onClick={this.onCloseProduct} color='primary'>
                CONTINUAR
              </ButtonModal>
            </DialogActions>
          </Dialog>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40, 80, 100]}
          component='div'
          count={dataSource.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Pagina Anterior'
          }}
          nextIconButtonProps={{
            'aria-label': 'Pagina Siguiente'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ProductsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(withStyles)(ProductsList);
