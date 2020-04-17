import React, {Component} from 'react';

import axios from 'axios';
import ApiKeysForm from './ApiKeysForm';

import { Button} from 'antd';
import {authHeader} from "../../../../services/user";
import {baseURL, headers} from "../../../../services/request";
import {notification} from "antd/lib/index";


class ApiKeys extends Component {
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
            const { data } = await axios.get(`${baseURL}/api/keys?accountID=${accountID}`, axiosConfig);

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

    handleOk = async (event, type) => {
        event.preventDefault();

        this.setState({ loading: true });

        const { accountID: accountRef } = this.state;

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        const axiosData = {
            accountRef,
            role: (type === 'apiUser') ? 'API_USER' : 'ADMIN_USER',
        };

        try {

            await axios.post(`${baseURL}/api/keys`, axiosData, axiosConfig);

            //this.fetch();

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

    handleRemove = async(event, id) => {
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

            await axios.delete(`${baseURL}/api/keys/${id}`, axiosConfig);

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

    render(){
        const { data, visible, loading } = this.state;

        return (
            <div>
                <Button type="info" size='small' loading={loading} onClick={this.showModal}>
                    Apis
                </Button>

                <ApiKeysForm
                    title='Llaves de ingresos '
                    onCreate={this.handleOk}
                    onCancel={this.handleCancel}
                    onRemove={this.handleRemove}
                    data={data}
                    visible={visible}
                    loading={loading}
                    wrappedComponentRef={this.saveFormRef}
                />
            </div>
        );
    }
}

export default ApiKeys;
