import React, {Component} from 'react';
import {Button, Modal, Form, Input, Icon, Row, Select, Col} from 'antd';

const {Item: FormItem} = Form;
const {Option} = Select;

let id = [{
    type: undefined,
    bankName: undefined,
    accountNumber: undefined
}];

const banks = [
    {label: 'Banco del País', value: 'BANPAIS', select: false},
    {label: 'Banco Atlántida', value: 'BANCATLAN', select: false},
    {label: 'Banco de América Central', value: 'BAC', select: false},
    {label: 'Banco de Occidente', value: 'BANCOOCCIDENTE', select: false},
];

class BankAccountsForm extends Component {
    constructor(props) {
        super(props);

        //this.bankSelect = this.bankSelect.bind(this)
    }

    state = {
        bankAccountsData: []
    };

    remove = (k) => {
        const {form} = this.props;

        // can use data-binding to get
        const keys = form.getFieldValue('bankAccounts');

        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            bankAccounts: keys.filter((key, index) => index !== k),
        });
    };

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('bankAccounts');
        const nextKeys = keys.concat(id);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            bankAccounts: nextKeys,
        });
    };

    bankSelect = (value, option) => {
        var key = option.key;

        banks[key].select = true;
    };

    bankDeselect = (value, option) => {
        var key = option.key;

        banks[key].select = false;
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

        getFieldDecorator('bankAccounts', {initialValue: data});

        const keys = getFieldValue('bankAccounts');

        const banksData = banks.map(({label, value, select}, index) => (
            <Option key={index.toString()} value={value} disabled={select}>{label}</Option>
        ));

        const formItems = keys.map((k, index) => (
            <Row key={k._id || index}>
                <Col span={0}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}]._id`, {
                            initialValue: k._id,
                        })(
                            <input />
                        )}
                    </FormItem>
                </Col>
                <Col span={7} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].bankName`, {
                            rules: [
                                {required: true, message: 'Seleccione el banco'},
                            ],
                            initialValue: k.bankName,
                        })(
                            <Select placeholder="Banco" onSelect={this.bankSelect} onDeselect={this.bankDeselect}>
                                {banksData}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={4} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].type`, {
                            rules: [
                                {required: true, message: 'Tipo de cuenta'},
                            ],
                            initialValue: k.type,
                        })(
                            <Select placeholder="Tipo de cuenta">
                                <Option value="CHECK">Ahorro</Option>
                                <Option value="SAVING">Cheques</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={4} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].currency`, {
                            rules: [
                                {required: true, message: 'Moneda de la cuenta'},
                            ],
                            initialValue: k.currency,
                        })(
                            <Select placeholder="Moneda de la cuenta">
                                <Option value="HNL">Lempiras</Option>
                                <Option value="USD">Dolares</Option>
                                <Option value="EUR">Euros</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={6} style={{marginRight: 4}}>
                    <FormItem label=''>
                        {getFieldDecorator(`keys[${index}].accountNumber`, {
                            rules: [
                                {required: true, message: 'Número de cuenta bancaria'},
                            ],
                            initialValue: k.accountNumber,
                        })(
                            <Input placeholder='Número de cuenta'/>
                        )}
                    </FormItem>
                </Col>
                <Col span={1}>
                    <FormItem label='' {...formItemLayoutWithOutLabel}>
                        {keys.length > 1 ? (
                            <Icon
                                theme="twoTone"
                                type="minus-circle-o"
                                twoToneColor="#FF0000"
                                disabled={keys.length === 1}
                                className="dynamic-delete-button"
                                onClick={(e) => (k._id === undefined) ? this.remove(index) : onRemove(e, k._id)}
                            />
                        ) : null}
                    </FormItem>
                </Col>
            </Row>
        ));

        return (
            <Modal
                title={`${title} cliente`}
                width={820}
                setFieldsValue
                visible={visible}
                loadimg={loading}
                onCancel={onCancel}

                footer={[
                    <Button key="back" onClick={onCancel}>Cancelar</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={onCreate}>
                        Guardar
                    </Button>,
                ]}>

                <Form layout="vertical">
                    {formItems}
                    <FormItem>
                        <Button type="dashed" onClick={this.add} style={{width: '100%'}}>
                            <Icon type="plus"/> Agregar Cuenta bancaria
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create()(BankAccountsForm);
