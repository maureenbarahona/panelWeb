/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:09:51-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-20T16:10:18-06:00
 */
import './index.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';

import logo from './../../assets/images/logo.svg';
//import {UserAdminData} from './../../fakeApi'
import {Form, Row, Col, Icon, Input, Button, Checkbox, notification} from 'antd';
import {authHeader} from "../../services/user";
import {baseURL, headers} from "../../services/request";
import axios from "axios/index";

const FormItem = Form.Item;


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            remindMe: false,
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    login = async (email, password) => {

        this.setState({submitted: true});

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        try {
            const response = await axios.post(`${baseURL}/auth/login`, {email, password}, axiosConfig);
            const {data} = response;
            //const data = await UserAdminData()
            sessionStorage.setItem('user', JSON.stringify(data));

            this.setState({
                submitted: false
            });

            this.redirectToTarget();

        } catch (error) {
            this.setState({submitted: false});

            const {response} = error;
            let message = 'Error de conexion';
            if (response) {
                const {data} = response;
                message = data.message;
            }

            notification['error']({
                message: 'Error',
                description: message,
            });
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleChangeCheck(e) {
        const {name, checked} = e.target;
        this.setState({[name]: checked});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({submitted: true});

        const {email, password, remindMe} = this.state;

        //const { dispatch } = this.props;
        if (email && password) {
            try {
                this.login(email, password, remindMe);

            } catch (error) {
                this.setState({submitted: false});
            }

            //this.setState({submitted: false});

        }
    }

    redirectToTarget = () => {
        this.context.router.history.push(`/panel/dashboard`)
    };

    render() {
        //const { loggingIn } = this.props;

        const {email, password, remindMe, submitted} = this.state;

        return (
            <Row>
                <Col style={{minHeight: '100vh', backgroundColor: '#FFF'}} className="formMain" xs={24} sm={18} md={14}
                     lg={10} xl={6}>
                    <div>
                        <div className="logo">
                            <img alt="logo" src={logo}/>
                        </div>

                        <div>
                            Ingresa tu cuenta
                        </div>

                        <Form className="login-form" onSubmit={this.handleSubmit}>
                            <FormItem>
                                <Input value={email} onChange={this.handleChange}
                                       disabled={submitted}
                                       prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} name="email"
                                       placeholder="Usuario/Correo"/>
                            </FormItem>
                            <FormItem>
                                <Input value={password} onChange={this.handleChange}
                                       disabled={submitted}
                                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} name="password"
                                       type="password" placeholder="Contraseña"/>
                            </FormItem>
                            <FormItem>
                                <Checkbox
                                    name="remindMe"
                                    onChange={this.handleChangeCheck}
                                    checked={remindMe}>
                                    Recordarme
                                </Checkbox>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-button"
                                    loading={submitted}>
                                    Ingresar
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Link className="login-form-forgot" to='/forgotPassword'>¿Olvido la contraseña?</Link>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
                <Col xs={20} sm={16} md={12} lg={8} xl={4}></Col>
            </Row>


        );
    }
}

export default Login;
