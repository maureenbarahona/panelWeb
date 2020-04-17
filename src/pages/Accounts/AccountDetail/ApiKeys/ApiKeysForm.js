/**
 * @Author: maureen
 * @Date:   2019-02-19T11:44:42-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T22:00:27-06:00
 */



import React, {Component} from 'react';
import {Button, Modal, Form, Input, Icon, Row, Col, Divider } from 'antd';

const {Item: FormItem} = Form;



class ApiKeysForm extends Component {
    constructor(props) {
        super(props);

        const { accountID } = props;

        this.state = {
            accountRef: accountID
        }
    }

    state = {
        data: [],
        accountRef: undefined
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {title, visible, loading, onCreate, onRemove, onCancel, form, data = [] } = this.props;

        const {getFieldValue, getFieldDecorator} = form;

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };

        const apiTokens = [];
        const adminTokens = [];

        data.map((api) => {
            if (api.role === 'ADMIN_USER') {
                adminTokens.push(api);
            }
        });

        data.map((api) => {
            if (api.role === 'API_USER') {
                apiTokens.push(api);
            }
        });

        getFieldDecorator('apiKeys', {initialValue: apiTokens});
        getFieldDecorator('adminKeys', {initialValue: adminTokens});

        const apiKeys = getFieldValue('apiKeys');
        const adminKeys = getFieldValue('adminKeys');

        const apiKeysItems = apiKeys.map((k, index) => (
            <Row key={index.toString()}>
                <Col span={22} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].token`, {
                            rules: [
                                {required: true, message: 'Tipo de cuenta'},
                            ],
                            initialValue: k.token,
                        })(
                            <Input disabled={true} placeholder="TOKEN" style={{ width: '100%', marginRight: 8 }} />
                        )}
                    </FormItem>
                </Col>
                <Col span={1}>
                    <FormItem label='' {...formItemLayoutWithOutLabel}>
                        <Icon className="dynamic-delete-button" type={ (loading) ? "loading" : "minus-circle-o"} theme="twoTone" twoToneColor="#FF0000" disabled={adminKeys.length === 1} onClick={(e) => onRemove(e, k._id)}/>
                    </FormItem>
                </Col>
            </Row>
        ));

        const adminKeysItems = adminKeys.map((k, index) => (
            <Row key={index.toString()}>
                <Col span={22} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].token`, {
                            rules: [
                                {required: true, message: 'Tipo de cuenta'},
                            ],
                            initialValue: k.token,
                        })(
                            <Input disabled={true} placeholder="TOKEN" style={{ width: '100%', marginRight: 8 }} />
                        )}
                    </FormItem>
                </Col>
                <Col span={1}>
                    <FormItem label='' {...formItemLayoutWithOutLabel}>
                        <Icon className="dynamic-delete-button" type={ (loading) ? "loading" : "minus-circle-o"} theme="twoTone" twoToneColor="#FF0000" disabled={adminKeys.length === 1} onClick={(e) => onRemove(e, k._id)}/>
                    </FormItem>
                </Col>
            </Row>
        ));

        return (
            <Modal
                footer={false}
                title={`${title} cliente`}
                setFieldsValue
                width={820}
                visible={visible}
                onCancel={onCancel}>

                <Form layout="vertical">
                    <Divider orientation="left">API</Divider>

                    {apiKeysItems}
                    <FormItem>
                        <Button type="dashed" onClick={(e) => onCreate(e, 'apiUser')} loading={loading} style={{width: '100%'}}>
                            <Icon type="plus"/> Nueva llave API
                        </Button>
                    </FormItem>

                    <Divider orientation="left">Administrador</Divider>

                    {adminKeysItems}
                    <FormItem>
                        <Button type="dashed" onClick={(e) => onCreate(e, 'adminUser')} loading={loading} style={{width: '100%'}}>
                            <Icon type="plus"/> Nueva de llave de administrador
                        </Button>
                    </FormItem>

                </Form>
            </Modal>
        )
    }

}

export default Form.create()(ApiKeysForm);
