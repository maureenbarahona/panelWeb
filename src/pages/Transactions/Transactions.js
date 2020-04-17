/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T09:54:19-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T22:31:55-06:00
 */
//import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {authHeader, userInfo} from './../../services/user';
//import * as actions from './Transactions.ducks';
import TransactionsList from './TransactionsList';
import Filter from './../../components/Container/Filters';
import {  notification} from 'antd';

import {headers, baseURL} from './../../services/request';

import Grid from '@material-ui/core/Grid';
import Notifications from '../../components/SnackBar';



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';



const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: '#090909',
        letterSpacing: '2px',
        textTransform: 'uppercase',
    },
    primaryText: {
        fontSize: 26,
        color: "#F8931D"
    },
    successText: {
        fontSize: 26,
        color: "#00591E"
    },
    dangerText: {
        fontSize: 26,
        color: "#FF0909"
    }
};



// const EnumTransactionsStatus = {
//     DENIED: 4,
//     FLOATING: 1,
//     CANCELED: 2,
//     COMPLETED: 3,
//     PENDING: 5
// }

// const enumStatus = {
//     FLOATING: {
//         text: 'Flotante',
//         color: 'orange'
//     },
//     DENIED: {
//         text: 'Rechazado',
//         color: 'red'
//     },
//     CANCELED: {
//         text: 'Cancelado',
//         color: 'red'
//     },
//     COMPLETED: {
//         text: 'Completo',
//         color: 'green'
//     },
//     PENDING: {
//         text: 'Pendiente',
//         color: 'yellow'
//     }
// }
const columns = [
    { id: 'cardCode', numeric: false, disablePadding: true, label: 'TARJETA' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'FECHA' },
    { id: 'accountName', numeric: false, disablePadding: false, label: 'COMERCIO' },
    { id: 'emisor', numeric: false, disablePadding: false, label: 'EMISOR' },
    { id: 'adq', numeric: false, disablePadding: false, label: 'ADQ' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'MONTO' },
    { id: 'status', numeric: false, disablePadding: false, label: 'ESTADO' },
];

const userLoged = userInfo();
//ADMIN_USER token


/*const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};*/


class Transactions extends Component {

    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleCanceledClick = this.handleCanceledClick.bind(this);
        this.handleLiquidationClick = this.handleLiquidationClick.bind(this);
    }

    state = {
        startDate: moment().startOf('month'),
        endDate: moment().endOf('day'),
        data: [],
        dataSource: [],
        notification: {
            open: false,
            message: '',
            variant: ''
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

    async getData() {

        this.setState({ loading: true });

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        const startDate = moment(this.state.startDate, 'DD/MM/YYYY').unix();
        const endDate = moment(this.state.endDate, 'DD/MM/YYYY').unix();

        try {
            const { data } = await axios.get(`${baseURL}/payments?startDate=${startDate}&endDate=${endDate}&include=issuer`, axiosConfig);

            let balance = 0;
            let rejectedCounter = 0;
            let approvedCounter = 0;

            const dataSource = data.map(payment => {
                balance += payment.amount;

                let status = '';

                switch (payment.status) {
                    case 'FLOATING':
                        approvedCounter++;
                        status = 'Flotante';
                        break;
                    case 'DENIED':
                        rejectedCounter++;
                        status = 'Denegada';
                        break;
                    case 'CANCELED':
                        status = 'Cancelada';
                        break;
                    case 'PAYMENT':
                        status = 'Pagada';
                        break;
                    case 'PENDING':
                        status = 'Pendiente';
                        break;
                    default:
                        break;
                }

                const cardCode = `${payment.paymentType} ${payment.safeIdentifier}`;
                let accountLink = '';

                if (userLoged.role === 'SUPER_USER') {

                    const { _id: accountID, displayName: accountName } = payment.account;

                    accountLink = <Link to={{pathname: `/panel/accounts/${accountID}`}}>{accountName}</Link>;
                }



                return {
                    status,
                    cardCode,
                    emisor: 'BAC',
                    id: payment._id,
                    adq: 'Promerica',
                    createdAt: moment(payment.createdAt).format('DD MMMM YYYY hh:mm a'),
                    accountName: accountLink,
                    amount: `L ${payment.amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}`,
                };
            });

            this.setState({
                balance: `L ${balance.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}`,
                dataSource,
                loading: false,
                rejectedCounter,
                approvedCounter,
            });

        } catch (error) {


            const {response} = error;

            let message = 'Error de conexión';
            if (response) {
                const {data} = response;
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

            /*notification['error']({
                message: 'Error',
                description: message,
            });*/
        }
    }

    componentDidMount() {
        this.getData();
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    async handleLiquidationClick() {

        this.setState({loading: true});

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        const {_id: userID} = userInfo();

        const payload = {
            createdBy: userID,
            withdrawalAccount: {
                bankName: 'BAC Credomatic',
                currency: "HNL",
                accountNumber: '741 953 348',
                type: "SAVING"
            },
            payments: this.state.selectedRowKeys
        };

        try {
            await axios.post(`${baseURL}/liquidations`, payload, axiosConfig);

            this.getData();
        } catch (error) {
            //console.log(error.json());
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
            //console.log(error.json());
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

    handleTabChange(activeKey) {



        /*if (activeKey === 1) {
          this.setState({ dataSource: _filter(data, {status: 'FLOATING'}) });
        }

        if (activeKey === 2) {
          this.setState({ dataSource: _filter(data, {status: 'CANCELED'}) });
        }

        if (activeKey === 3) {
          this.setState({ dataSource: [_filter(data, {status: 'COMPLETED'})] });
        }

        if (activeKey === 4) {
          this.setState({ dataSource: [_filter(data, {status: 'DENIED'})] });
        }*/
    }

    render() {
        const { balance, loading, notification, dataSource, rejectedCounter, approvedCounter } = this.state;
        const { message, variant } = notification;

        const transactionsProps = {
            columns,
            loading,
            dataSource,
        };

        const filterProps = {
            loading: this.state.loading,
            rangePickerProps: {
                defaultValue: [this.state.startDate, this.state.endDate],
                onChangeStart: (key, value) => {
                    const startDate = value;

                    this.setState({ startDate });
                },
                onChangeEnd: (key, value) => {
                    const endDate = value;

                    this.setState({ endDate });
                }
            },
            buttonProps: {
                onClick: () => {
                    this.getData();
                }
            }

        };

        const { classes } = this.props;

        return (
            <div>
                <Notifications message={message} variant={variant}
                    className={classes.margin}
                />
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} gutterBottom>
                                    BALANCE
                                </Typography>

                                <Typography className={classes.primaryText} variant="h5" component="h2">
                                    {balance}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} gutterBottom>
                                    APROBADAS
                                </Typography>

                                <Typography className={classes.successText} variant="h5" component="h2">
                                    {approvedCounter}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} gutterBottom>
                                    RECHAZADAS
                                </Typography>

                                <Typography className={classes.dangerText} variant="h5" component="h2">
                                    {rejectedCounter}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Filter {...filterProps}></Filter>

                <TransactionsList {...transactionsProps}></TransactionsList>


            </div>
        );
    }
}


Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transactions);
