
import axios from 'axios';
import moment from 'moment';
import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import {authHeader} from '../../../services/user';
import Filter from '../../../components/Container/Filters';
import {notification} from 'antd';
import {headers, baseURL} from '../../../services/request';
import Notifications from '../../../components/SnackBar';
import style from './styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import SearchBar from '../../../components/Container/Header/SearchBar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
    startDateFormat,
    endDateFormat,
    startDateOf,
    endDateOf
  } from '../../../utils/helpers';

let myStartDate;
let myEndDate;

let subsValue='';


class PaymentHistory extends Component {

    getMuiTheme = () => TableFormat;

    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleCanceledClick = this.handleCanceledClick.bind(this);
    }

    state = {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('day'),
        dataSource: [],
        dataSourceOriginal: [],
        subscriptions: [],
        subscriptionValue:'',
        notification: {
            open: false,
            message: '',
            variant: ''
        }
    };

componentDidMount() {
    myStartDate = startDateOf();
    myEndDate = endDateOf();
    }

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = e => {
    const value = e.target.value.toLowerCase();
    let filteredData = this.state.dataSourceOriginal;
    if (value !== '') {
      filteredData = filteredData.filter(payment =>
        payment.firstName.toLowerCase().includes(value) || 
        payment.lastName.toLowerCase().includes(value)
      );
  
      this.setState({
        dataSource: filteredData
      });
    } else
      this.setState({
        dataSource: this.state.dataSourceOriginal
      });
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

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.getData({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    filterData = (event) =>{
        event.preventDefault();
        const status = event.target.value;
        let filteredData = this.state.originalData;
        filteredData = filteredData.filter(payment => payment.status === status);
            this.setState({
                dataSource: filteredData,
                loading: false,
            });
    }

    onChangeFilter = (event) =>{
        subsValue = event.target.value;
        this.setState({
            subscriptionValue: event.target.value
        });
        this.getData();
    }

    onFilterDate = (event) =>{
        alert(this.state.startDate);
    }

    async getData() {


        let accountID = sessionStorage.getItem('user');
        accountID = JSON.parse(accountID)._id;
        this.setState({ loading: true });

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        const startDate = moment(myStartDate, 'YYYY/MM/DD').unix();
        const endDate = moment(myEndDate, 'YYYY/MM/DD').unix();

        try {
            let { data } = await axios.get(`${baseURL}/charge/${subsValue}?startDate=${startDate}&endDate=${endDate}&accountID=${accountID}`, axiosConfig);
            let cont = 1;
            let jsonTemp1 = data
            jsonTemp1.map( (payment) => 
                {
                    payment._id=cont++;
                    payment.firstName=payment.customer.firstName;
                    payment.lastName=payment.customer.lastName;

                    return payment;
                }
            );
            data=jsonTemp1;

            this.setState({
                dataSource:data,
                dataSourceOriginal:data,
                loading: false,
            });

        } catch (error) {
            const {response} = error;

            let message = 'Error de conexión';
            if (response) {
                const data = response;
                message = (data.message) ?  data.message : 'Error de conexión';
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

    async getSubscriptionsSelect() {
        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }
            let  data1  = await axios.get(`${baseURL}/subscriptions`, axiosConfig);
            this.setState({
                subscriptions:data1.data,
            });

    }

    componentWillMount() {
        this.getSubscriptionsSelect()
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    async handleCanceledClick() {

        this.setState({loading: true});

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        const payments = this.state.selectedRowKeys;

        try {
            await Promise.all(payments.map(async paymentID => {
                const payload = {
                    status: 'CANCELED'
                };

                await axios.put(`${baseURL}/payments/${paymentID}`, payload, axiosConfig);
            }));


            this.getData();
        } catch (error) {
            this.setState({loading: false});
            const {response} = error;

            const {data} = response;
            let {message} = data;

            if (message === 'Invalid params') {
                message = 'Error procesando transacción'
            }

            notification['error']({
                message: 'Error',
                description: message,
            });
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/liquidations'/>
        }
    }
    handleTabChange(activeKey) {}

    render() {
        const { notification, dataSource, subscriptionValue} = this.state;
        const { classes } = this.props;
        const { message, variant } = notification;

        const dataSourceC = dataSource.map(item => {
            return [
              moment(item.paymentDate).format('DD MMMM YYYY hh:mm a'),
              item.status,
              item.description,
              `L ${item.amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}`,
              `${item.firstName} ${item.lastName}`,
              moment(item.createdAt).format('DD MMMM YYYY hh:mm a'),
              item._id
            ];
          });
      
          const columns = [
            { id: 'paymentDate', numeric: false, disablePadding: false, label: 'FECHA PAGO' },
            { id: 'status', numeric: false, disablePadding: false, label: 'ESTADO' },
            { id: 'description', numeric:false, disablePadding: false, label: 'DESCRIPCION' },
            { id: 'amount', numeric: false, disablePadding: false, label: 'MONTO' },
            { id: 'customer', numeric: false, disablePadding: false, label: 'CLIENTE' },
            { id: 'createdAt', numeric: false, disablePadding: false, label: 'FECHA CREACION' },
          ];
      
          const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            filter: true,
            search: false,
            selectableRows: 'none',
            download: true,
            pagination: true,
            viewColumns: true,
            print: false,
            rowsPerPage: 50,
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
            
            <Notifications
                message={message}
                variant={variant}
                className={classes.margin}
            />
            <div style={{marginBottom:10, flexDirection:'row'}}>
                {/*<div><h5>SELECCIONA UNA SUBSCRIPCION: </h5></div>*/}
                <div>
                <form variant='standard' className={classes.root} autoComplete='off'>
                <FormControl className={classes.formControl} style={{flexDirection:'row', alignItems:'center'}}>
                    <h5 style={{color:'gray'}}>SELECCIONA UNA SUBSCRIPCION: </h5>
                    <Select
                    value={subscriptionValue}
                    onChange={this.onChangeFilter}
                    name='age'
                    variant='outlined'
                    style={{ backgroundColor: 'white', height: '40px', width: '200px', marginLeft:10 }}
                    input={<OutlinedInput name='age' style={{ height: '40px' }} />}
                    >
                    <MenuItem value='' disabled></MenuItem>

                    {this.state.subscriptions.map(sub => (
                        <MenuItem value={sub._id}> {sub.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </form>
                </div>

            </div>
            
            <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
                <SearchBar placeholder='Buscar...' onChange={this.handleChange} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, margin: '0 0 -60px 0' }}>
                <Filter {...this.filterProps}></Filter>
            </div>
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                title={''}
                data={dataSourceC}
                columns={columns}
                options={options}
                />
            </MuiThemeProvider>
            </div>
        );
    }
}


PaymentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(PaymentHistory);
