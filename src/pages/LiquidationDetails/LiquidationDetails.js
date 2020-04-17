/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T09:54:19-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T22:08:17-06:00
 */
//import { connect } from 'react-redux';
import axios from 'axios';

import React, {Component} from 'react';

import {authHeader} from './../../services/user';
import {headers, baseURL} from './../../services/request';
import {lpad} from './../../utils/helpers';
import Details from './Details';


//import * as actions from './Transactions.ducks';


import {Form, notification, Input, Select, Row, Col, Button, Tag, Popconfirm, Breadcrumb} from 'antd';

const {Option} = Select;
const {Item: FormItem} = Form;

const banks = [
    {name: 'Banco de Honduras', value: "BCH"},
    {name: 'Banco Atlantida', value: "BA"},
    {name: 'Banco de Occidente', value: "BO"},
    {name: 'Banco Financiera Centroamericana', value: "BFC"},
    {name: 'Banco Hondureño del Café', value: "BHC"},
    {name: 'Banco del País', value: "BPais"},
    {name: 'Banco Financiera Comercial Hondureña', value: "BFCH"},
    {name: 'Banco Davivienda Honduras', value: "Davivienda"},
    {name: 'Banco Promerica', value: "BPromerica"},
    {name: 'Banco de Desarrollo Rural Honduras', value: "BDRH"},
    {name: 'Banco Azteca de Honduras', value: "BAzteca"},
    {name: 'Banco Popular', value: "BPopular"},
    {name: 'Banco de América Central Honduras', value: "BAC"},
]
const statusTagsColors = {
    PENDING: (<Tag color="#F8931D">Pendiente</Tag>),
    CANCELED: (<Tag color="#f50">Cancelado</Tag>),
    COMPLETED: (<Tag color="#87d068">Completo</Tag>),
}

//const {role: userRole} = userInfo();
const userRole = 'SUPER_USER';

class LiquidationDetails extends Component {

    state = {
        data: {},
        status: '',
        loading: false,
        liquidationID: '',
        withdrawalAccount_type: '',
        withdrawalAccount_bankname: '',
        withdrawalAccount_accountNumber: '',
        withdrawalAccount_paymentReference: '',
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeBankName = this.handleChangeBankName.bind(this);
        this.handleChangeAccountType = this.handleChangeAccountType.bind(this);

        this.handleLiquidationCompleted = this.handleLiquidationCompleted.bind(this);
    }

    async getData(liquidationID) {
        this.setState({loading: true});

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        try {
            const response = await axios.get(`${baseURL}/liquidations/${liquidationID}?include=payments`, axiosConfig)

            const {data} = response;
            const {status} = data;

            this.setState({
                loading: false,
                data,
                status
            });

        } catch (error) {
            this.setState({loading: false});
            const {response} = error;
            if (!response) {
                notification['error']({
                    message: 'Error',
                    description: 'Error al obtener la informacion',
                });
            } else {
                const {data} = response;
                const {message} = data;
                notification['error']({
                    message: 'Error',
                    description: message,
                });
            }

        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const {id} = params;

        this.setState({liquidationID: id});

        this.getData(id);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleChangeStatus(status) {
        this.setState({status});
    }

    handleChangeBankName(bankName) {
        this.setState({withdrawalAccount_bankname: bankName});
    }

    handleChangeAccountType(type) {
        this.setState({withdrawalAccount_type: type});
    }

    async handleLiquidationCompleted(event) {
        this.setState({loading: true});

        const {
            status,
            liquidationID,
            withdrawalAccount_type: type,
            withdrawalAccount_bankname: bankname,
            withdrawalAccount_accountNumber: accountNumber,
            withdrawalAccount_paymentReference: paymentReference,
        } = this.state;

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        }

        const payload = {
            status,
            withdrawalAccount: {
                type,
                bankname,
                accountNumber,
                paymentReference,
            }
        };

        try {
            await axios.post(`${baseURL}/liquidations/${liquidationID}`, payload, axiosConfig);

            //this.getData();

        } catch (error) {
            const {response} = error;

            const {data, status} = response;

            let {message} = data;

            if (status === 403) {
                message = 'No tiene permiso para editar esta información'
            }


            if (message === 'Invalid params') {
                message = 'Error procesando transacción'
            }

            notification.error({
                message: 'Error',
                description: message,
            });
        }

        this.setState({loading: false});

        this.props.history.go(-1);
    }

    render() {
        const {
            loading,
            data,
            status,
            liquidationID,
            withdrawalAccount_bankname,
            withdrawalAccount_accountNumber,
            withdrawalAccount_paymentReference
        } = this.state;
        const hasSelected = status !== 'PENDING';
        const {sequence, status: prevStatus} = data;
        const statusTagsSelect = (
            <div>

                <Col span={20} style={{paddingRight: '20px'}}>
                    <Select defaultValue="PENDING" onChange={this.handleChangeStatus}>
                        <Option value="PENDING" disabled="true">Pendiente</Option>
                        <Option value="COMPLETED">Pagada</Option>
                        <Option value="CANCELED">Cancelar</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Popconfirm title={`¿Desea ${status === 'COMPLETED' ? 'completar' : 'cancelar'} esta liquidación?`}
                                onConfirm={this.handleLiquidationCompleted} okText="Si" cancelText="No"
                                placement="right">
                        <Button
                            style={{marginRight: 8}}
                            type="primary"
                            disabled={!hasSelected}
                            loading={loading}>
                            GUARDAR
                        </Button>
                    </Popconfirm>
                </Col>
            </div>
        );
        const banksAccounts = banks.map(({name, value}) => <Option value={value}>{name}</Option>);
        return (
            <div>
                <Row style={{marginBottom: '20px'}}>
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item href="/panel/liquidations">Liquidaciones</Breadcrumb.Item>
                        <Breadcrumb.Item>{liquidationID}</Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Col span={24} style={{backgroundColor: "white", padding: "30px"}} loading={loading}>

                    <Row>
                        <Col>
                            <Form layout="vertical">
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="Liquidación:">
                                            <strong>#{lpad(sequence, 8)}</strong>
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="Cuenta:">
                                            <strong>Cloudbiz S.A. de C.V.</strong>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={{paddingRight: '20px'}}>
                                        <FormItem label="Banco:" onChange={this.handleChangeBankName}>
                                            {
                                                (userRole === 'SUPER_USER') ?
                                                    <Select>{banksAccounts}</Select> :
                                                    <strong>{withdrawalAccount_bankname || '--'}</strong>
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="Tipo de cuenta:">
                                            {
                                                (userRole === 'SUPER_USER') ?
                                                    <Select onChange={this.handleChangeAccountType}>
                                                        <Option value="SAVING">Ahorro</Option>
                                                        <Option value="CHECK">Cheque</Option>
                                                    </Select> :
                                                    <strong>{withdrawalAccount_bankname || '--'}</strong>
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={{paddingRight: '20px'}}>
                                        <FormItem label="N° de cuenta:">
                                            {
                                                (userRole === 'SUPER_USER') ?
                                                    <Input name="withdrawalAccount_accountNumber"
                                                           value={withdrawalAccount_accountNumber}
                                                           onChange={this.handleChange}/> :
                                                    <strong>{withdrawalAccount_bankname || '--'}</strong>
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="Referencia de pago:">
                                            {
                                                (userRole === 'SUPER_USER') ?
                                                    <Input name="withdrawalAccount_paymentReference"
                                                           value={withdrawalAccount_paymentReference}
                                                           onChange={this.handleChange}/> :
                                                    <strong>{withdrawalAccount_bankname || '--'}</strong>
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12} style={{paddingRight: '20px'}}>
                                        <FormItem label="Estado:">
                                            {(userRole === 'SUPER_USER' && prevStatus === 'PENDING') ? statusTagsSelect : statusTagsColors[status]}
                                        </FormItem>
                                    </Col>
                                </Row>


                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Details loading={loading} {...data} />
                    </Row>
                </Col>
            </div>
        );
    }
}

export default LiquidationDetails;
