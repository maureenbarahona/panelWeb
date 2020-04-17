import React, {Component} from 'react';
import axios from 'axios';
import BankAccountsForm from './BankAccountsForm';
import { Button, notification } from 'antd';
import { authHeader } from '../../../../services/user';
import { baseURL, headers } from "../../../../services/request";


class BankAccounts extends Component {

    constructor(props) {
        super(props);

        const { accountID } = props;

        this.state = {
            data: [],
            accountID: accountID,
            loading: false,
            visible: false,
        };
    }

    state = {
        data: [],
        accountID: '',
        loading: false,
        visible: false,
    };

    showModal = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        this.fetch();
    };

    async fetch() {
        const { accountID } = this.state;

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        try {
            const { data } = await axios.get(`${baseURL}/banks?accountID=${accountID}`, axiosConfig);

            this.setState({
                data,
                visible: true,
                loading: false,
            });

        } catch ({ response }) {

            this.setState({
                visible: true,
                loading: false,
            });
        }
    }

    createBankAccount = async(keys, form) => {
        const { accountID: account } = this.state;

        await Promise.all(keys.map(async data => {
            const axiosConfig = {
                headers: {
                    ...headers,
                    ...authHeader()
                },
                responseType: 'json',
            };

            const {
                _id,
                type,
                bankName,
                currency,
                displayName = 'Cuenta bancaria',
                accountNumber,
            } = data;

            const axiosData = {
                type,
                account,
                bankName,
                currency,
                displayName,
                accountNumber,
            };

            try {

                if (_id !== undefined) {
                    await axios.put(`${baseURL}/banks/${_id}`, axiosData, axiosConfig);
                } else {
                    await axios.post(`${baseURL}/banks`, axiosData, axiosConfig);
                }

                form.resetFields();

                this.setState({
                    visible: false,
                    loading: false
                });

            } catch({ response }) {
                let errorMessage = '';

                if (response) {
                    const { data } = response;

                    const { message } = data;
                    errorMessage = message;
                }

                notification.error({
                    message: 'Error',
                    description: errorMessage,
                });
            }
        }));
    }

    handleOk = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.createBankAccount(values.keys, form);
        });
    };

    handleRemove = async (event, id) => {
        event.preventDefault();

        this.setState({ loading: true });

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        try {

            await axios.delete(`${baseURL}/banks/${id}`, axiosConfig);

            this.fetch();

        } catch({ response }) {
            let errorMessage = '';

            if (response) {
                const { data } = response;

                const { message } = data;
                errorMessage = message;
            }

            notification.error({
                message: 'Error',
                description: errorMessage,
            });
        }



    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    onChangeAccountState = (e) => {
        const { checked } = e.target;

        this.setState({
            isActive: checked
        });
    };


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };



    render() {
        const { data, loading, visible } = this.state;

        return (
            <div>
                <Button type="primary" ghost={true} size='small' loading={this.state.loading} onClick={this.showModal}>
                    Cuenta bancaria
                </Button>

                <BankAccountsForm
                    data={data}
                    visible={visible}
                    loading={loading}
                    onCreate={this.handleOk}
                    title='Cuentas bancarias'
                    onRemove={this.handleRemove}
                    onCancel={this.handleCancel}
                    wrappedComponentRef={this.saveFormRef}
                />
            </div>
        );
    }
}

export default BankAccounts;
