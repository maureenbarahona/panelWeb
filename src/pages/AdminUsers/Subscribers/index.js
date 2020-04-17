import axios from 'axios';
import moment from 'moment';
import style from './styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import SubscribersList from './subscribersList';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { authHeader } from '../../../services/user';
import { Redirect, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Filter from '../../../components/Container/Filters';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { headers, baseURL } from '../../../services/request';
import SearchBar from '../../../components/Container/Header/SearchBar';

let myStartDate;
let myEndDate;

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const columns = [
  {
    id: 'subscriptionName',
    numeric: false,
    disablePadding: true,
    label: 'NOMBRE'
  },
  {
    id: 'customerName',
    numeric: false,
    disablePadding: true,
    label: 'CLIENTE'
  },
  {
    id: 'productName',
    numeric: false,
    disablePadding: false,
    label: 'PRODUCTOS'
  },
  { id: 'amount', numeric: true, disablePadding: false, label: 'MONTO' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'CREADO' },
  { id: 'action', numeric: false, disablePadding: false, label: 'ACCION' }
];

class Subscribers extends Component {

  state = {
    redirectToEdit: false,
    loading:false,
    startDate: moment().startOf('month'),
    endDate: moment().endOf('day'),
    isNewSubscription: false,
    data: [],
    dataSource: [],
    dataSourceOriginal: [],
    infoSubscribers: {
      customerName: '',
      description: '',
      amount: ''
    },
    notification: {
      open: false,
      message: '',
      variant: ''
    },
    open: false
  };



  handleSubmit = e => {
    this.setState({ open: false });
  }

  handleChange = e => {
    const value = e.target.value.toLowerCase();
    let filteredData = this.state.dataSourceOriginal;
    if (value !== '') {
      filteredData = filteredData.filter(subscriber => {
        if (subscriber.name.toLowerCase().includes(value)) {
          return subscriber;
        }
        return filteredData;
      });
      this.setState({
        dataSource: filteredData
      });
    } else
      this.setState({
        dataSource: this.state.dataSourceOriginal
      });
  };

  onChangeInfo = name => event => {
    if (name === 'amount') {
      if (isNaN(event.target.value)) {
        alert('este campo debe de ser numerico');
        event.target.value = '';
        return;
      }
    }

    const { infoSubscribers } = this.state;

    infoSubscribers[name] = event.target.value;

    this.setState({ infoSubscribers: { ...infoSubscribers } });
  };

  onOpenModal = () => {
    this.setState({ redirectToEdit: true, isNewSubscription: true });
  };

  onCloseModal = () => {
    this.setState({ redirectToEdit: false });
  };

  filterProps = {
    disableButton: true,
    loading: this.state.loading,
    rangePickerProps: {
      defaultValue: [this.state.startDate, this.state.endDate],
      onChangeStart: event => {
        myStartDate = moment(event.target.value, 'YYYY/MM/DD').startOf('day');
        this.getDataSusbscriber();
      },
      onChangeEnd: event => {
        myEndDate = moment(event.target.value, 'YYYY/MM/DD').endOf('day');
        this.getDataSusbscriber();
      }
    },
    buttonProps: {
      onClick: () => {
        this.getDataSusbscriber();
      }
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };

    pager.current = pagination.current;

    this.setState({
      pagination: pager
    });

    this.getData({
      results: pagination.pageSize,

      page: pagination.current,

      sortField: sorter.field,

      sortOrder: sorter.order,

      ...filters
    });
  };

  refreshTable = () => {
    this.getDataSusbscriber();
  };

  async getDataSusbscriber() {
    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },

      responseType: 'json'
    };

    const startDate = moment(myStartDate, 'YYYY/MM/DD').unix();
    const endDate = moment(myEndDate, 'YYYY/MM/DD').unix();

    try {
      const { data } = await axios.get(
        `${baseURL}/subscriptions?startDate=${startDate}&endDate=${endDate}`,
        axiosConfig
      );
      const dataSource = data.map(Subscriber => {
        const {
          amount,
          customers = [],
          _id,
          description,
          createdAt,
          name,
          products = []
        } = Subscriber;

        return {
          amount,
          name,
          _id,
          description,
          createdAt,
          products,
          customers
        };
      });

      this.setState({ dataSource, dataSourceOriginal: dataSource });
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
    myStartDate = moment().startOf('month');
    myEndDate = moment().endOf('day');
    this.setState({ isNewSubscription: false });
    this.getDataSusbscriber();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  setNewSubscription() {
    this.setState({ isNewSubscription: false });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect push to='/liquidations' />;
    }
  };

  handleTabChange(activeKey) {}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { open, redirectToEdit } = this.state;

    if (redirectToEdit)
      return (
        <Redirect
          to={{
            pathname: '/panel/SubscriberDetail',
            state: { isNewSubscription: this.state.isNewSubscription }
          }}
        />
      );

    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          {' '}
          <DialogTitle id='form-dialog-title'>AGREGAR SUBSCRIPCION</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.onChangeInfo('customerName')}
              autoFocus
              margin='dense'
              id='customerName'
              label='Nombre del Subscriptor'
              type='customerName'
              fullWidth
              validators={['required']}
              errorMessages={['El nombre del Subscriptor es requerido']}
            />
            <TextField
              onChange={this.onChangeInfo('description')}
              margin='dense'
              id='description'
              label='Descripcion'
              type='description'
              fullWidth
            />
            <TextField
              onChange={this.onChangeInfo('amount')}
              margin='dense'
              id='amount'
              label='Precio'
              type='amount'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <ButtonModal onClick={this.onCloseModal} color='primary'>
              CANCELAR
            </ButtonModal>
            <ButtonModal onClick={this.handleSubmit} color='primary'>
              AGREGAR SUBSCRIPCION
              <NavLink
                exact
                to='/panel/SubscriberDetail'
                key='/panel/SubscriberDetail'
              />
            </ButtonModal>
          </DialogActions>
        </Dialog>
        <div style={{ position: 'relative', margin: '0 0 -60px 0' }}>
          <SearchBar placeholder='Buscar...' onChange={this.handleChange} />
        </div>
        <div
          style={{ position: 'relative', zIndex: 1, top: '60px', width: '80%' }}
        >
          <Filter {...this.filterProps}></Filter>
        </div>
        <SubscribersList
          dataSource={this.state.dataSource}
          columns={columns}
          onOpenModal={this.onOpenModal}
          refreshTable={this.refreshTable}
        />
      </div>
    );
  }
}

Subscribers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Subscribers);