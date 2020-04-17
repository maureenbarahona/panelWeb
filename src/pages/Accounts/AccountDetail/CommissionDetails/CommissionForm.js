import React, {Component} from 'react';
import {Button, Modal, Form, Input, Icon, Row, Select, Col} from 'antd';
import {authHeader} from "../../../../services/user";
import {baseURL, headers} from "../../../../services/request";
import axios from "axios/index";

const {Item: FormItem} = Form;
const {Option} = Select;

let id = [{
    transBank: undefined,
    ccType: undefined,
    commissionRate: '',
    fee: ''
}];

class CommissionForm extends Component {

    state = {
        commissionsData: []
    };

    async removeCommission(id) {
        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        try {
            await axios.delete(`${baseURL}/accountsRate/${id}`, axiosConfig);
        } catch(error) {
            this.setState({loading: false});

        }
    }

    remove = (k) => {
        const {form} = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('accountRate');

        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            accountRate: keys.filter((key, index) => {

                if (index === k) {
                    if (key._id) {
                        this.removeCommission(key._id);
                    }
                }

                return index !== k
            }),
        });
    };

    add = () => {
        const {form} = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('accountRate');
        const nextKeys = keys.concat(id);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            accountRate: nextKeys,
        });
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {title, visible, onCreate, onCancel, form, data = [] } = this.props;

        const {getFieldValue, getFieldDecorator} = form;

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 20, offset: 4},
            },
        };

        getFieldDecorator('accountRate', {initialValue: data});

        const keys = getFieldValue('accountRate');

        const formItems = keys.map((key, index) => {

            return (
                <Row key={key._id || index}>
                    <Col span={0}>
                        <FormItem label=''>
                            {getFieldDecorator(`keys[${index}]._id`, {
                                initialValue: key._id,
                            })(
                                <input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7} style={{marginRight: 4}}>
                        <FormItem label=''>
                            {getFieldDecorator(`keys[${index}].transBank`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [
                                    { required: true, message: 'Bancos' },
                                ],
                                initialValue: key.transBank,
                            })(
                                <Select placeholder="Banco">
                                    <Option value="BANPAIS">Banco del País</Option>
                                    <Option value="CREDOMATIC">Banco de America Central</Option>
                                    <Option value="BANRURAL">Banco de Desarrollo Rural</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} style={{marginRight: 4}}>
                        <FormItem label=''>
                            {getFieldDecorator(`keys[${index}].ccType`, {
                                rules: [
                                    {required: true, message: 'Tipo de tarjeta'},
                                ],
                                initialValue: key.ccType,
                            })(
                                <Select placeholder="Tipo de tarjeta">
                                    <Option value="VISA">Visa</Option>
                                    <Option value="MASTERCARD">Mastercard</Option>
                                    <Option value="AMERICAN_EXPRESS">Amex</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} style={{marginRight: 4}}>
                        <FormItem label=''>
                            {getFieldDecorator(`keys[${index}].commissionRate`, {
                                type: 'number',
                                rules: [
                                    {required: true, message: 'Comisión por transacción'},
                                ],
                                initialValue: key.commissionRate,
                            })(
                                <Input placeholder='% Comisión'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4} style={{marginRight: 4}}>
                        <FormItem label=''>
                            {getFieldDecorator(`keys[${index}].fee`, {
                                type: 'number',
                                rules: [
                                    {required: true, message: 'Cuota de transacción'},
                                ],
                                initialValue: key.fee,
                            })(
                                <Input placeholder='Cuotas'/>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <FormItem label='' {...formItemLayoutWithOutLabel}>
                            {keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={() => this.remove(index)}
                                />
                            ) : null}
                        </FormItem>
                    </Col>
                </Row>
            )
        });

        return (
            <Modal
                title={`${title} cliente`}
                width={820}
                setFieldsValue
                onOk={onCreate}
                visible={visible}
                onCancel={onCancel}
                okText="Guardar"
                cancelText="Cancelar">
                <Form>
                    {formItems}
                    <FormItem>
                        <Button type="dashed" onClick={this.add} style={{width: '100%'}}>
                            <Icon type="plus"/> Agregar Comisiones
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create()(CommissionForm);
