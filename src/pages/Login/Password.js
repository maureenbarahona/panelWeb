/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:09:51-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-24T16:58:31-06:00
 */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from './../../assets/images/logo.svg';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import auth from './../../utils/auth';

import './index.css';

const FormItem = Form.Item;


class Password extends Component {

  render() {

    return (
      <div className="formMain">
        <div className="logo">
          <img alt="logo" src={logo} />
        </div>
        <Form className="login-form">

          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          </FormItem>
          <FormItem>
            <Checkbox>Recordarme</Checkbox>

            <Link className="login-form-forgot" to='/forgotPassword'>¿Olvido la contraseña?</Link>
            <Button type="primary" htmlType="submit" className="submit-button">
              Ingresar
            </Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

export default Password;
