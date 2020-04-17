import React, {Component} from 'react';


import {  Modal, Form, Input, Checkbox,  Divider  } from 'antd';

const {Item: FormItem} = Form;

class AccountForm extends Component {

    state = {
        loading: false
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {title, visible, onCreate, onCancel, form, accountData = {}, onChangeAccountState } = this.props;

        const { getFieldDecorator } = form;

        let {
            rtn = '',
            email = '',
            isActive = false,
            monthlyFee = '',
            rtnContact = '',
            phoneNumber = '',
            displayName = '',
            legalContact = '',
            commercialName = '',
            idNumberContact = '',
            contactPhoneNumber = '',
        } = accountData;

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

                <Form layout="vertical">
                    <FormItem label="Estado">
                        {getFieldDecorator('isActive', {
                            initialValue: isActive,
                        })(
                            <Checkbox onChange={onChangeAccountState} checked={isActive}>{(isActive) ? 'Activo' : 'Inactivo'}</Checkbox>
                        )}
                    </FormItem>

                    <FormItem label="Nombre Comercial">
                        {getFieldDecorator('displayName', {
                            rules: [{ required: true, message: 'Nombre de cliente es requerido' }],
                            initialValue: displayName,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Razón social">
                        {getFieldDecorator('commercialName', {
                            rules: [{ required: true, message: 'Razón social es requerido' }],
                            initialValue: commercialName,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="RTN">
                        {getFieldDecorator('rtn', {
                            rules: [{ required: true, message: 'RTN de cliente es requerido' }],
                            initialValue: rtn,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Correo">
                        {getFieldDecorator('email', {
                            type: 'email',
                            rules: [{ required: true, message: 'Correo de cliente es requerido' }],
                            initialValue: email,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Número teléfonico">
                        {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: 'Número teléfonico de cliente es requerido' }],
                            initialValue: phoneNumber,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <Divider orientation="left">Representante Legal</Divider>

                    <FormItem label="Representante legal">
                        {getFieldDecorator('legalContact', {
                            initialValue: legalContact,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="RTN Representante">
                        {getFieldDecorator('rtnContact', {
                            initialValue: rtnContact,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Número de identidad de representante">
                        {getFieldDecorator('idNumberContact', {
                            initialValue: idNumberContact,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Número teléfonico de representante">
                        {getFieldDecorator('contactPhoneNumber', {
                            initialValue: contactPhoneNumber,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <Divider orientation="left">Contrato</Divider>

                    <FormItem label="Número de contrato">
                        {getFieldDecorator('contract', {
                            type: 'number',
                            initialValue: monthlyFee,
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Cuota mensual">
                        {getFieldDecorator('monthlyFee', {
                            type: 'number',
                            initialValue: monthlyFee,
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }

}

export default Form.create()(AccountForm);
