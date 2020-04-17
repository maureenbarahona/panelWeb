import React, {Component} from 'react';




import axios from 'axios';

import {  Button, notification } from 'antd';
import CommissionForm from './CommissionForm';
import { authHeader } from '../../../../services/user';
import { baseURL, headers } from "../../../../services/request";

//const { Item: FormItem } = Form;

class CommissionDetail extends Component {

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
            const { data } = await axios.get(`${baseURL}/accountsRate?accountID=${accountID}`, axiosConfig);

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

    async createCommissions(keys, form) {
        const { accountID: accountId } = this.state;

        await Promise.all(keys.map(async data => {
            const axiosConfig = {
                headers: {
                    ...headers,
                    ...authHeader()
                },
                responseType: 'json',
            };

            const {
                fee,
                ccType,
                transBank,
                commissionRate,
            } = data;

            const axiosData = {
                fee,
                ccType,
                transBank,
                accountId,
                commissionRate,
            };

            try {

                if (data._id) {
                    await axios.put(`${baseURL}/accountsRate/${data._id}`, axiosData, axiosConfig);
                } else {
                    await axios.post(`${baseURL}/accountsRate`, axiosData, axiosConfig);
                }



                form.resetFields();

                this.setState({
                    visible: false,
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

        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.createCommissions(values.keys, form);
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    onChangeAccountState = (e) => {
        const { checked } = e.target;

        this.setState({
            isActive: checked
        });
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        const { data } = this.state;

        return (
            <div>
                <Button type="primary" ghost={true} size='small' loading={this.state.loading} onClick={this.showModal}>
                    Comissiones
                </Button>

                <CommissionForm
                    title='Comisiones'
                    data={data}
                    onCreate={this.handleOk}
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    wrappedComponentRef={this.saveFormRef}
                />
            </div>
        );
    }
}

export default CommissionDetail;
