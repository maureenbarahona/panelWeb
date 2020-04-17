/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T15:31:50-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T21:57:48-06:00
 */

import React, {Component} from 'react';
import {Layout, Icon, Menu, Dropdown, Avatar} from 'antd';
import { logout, userInfo } from './../../services/user';
import './HeaderView.css';

const {Item: MenuItem, Divider: MenuDivider} = Menu
const {Header} = Layout;

class HeaderView extends Component {

    constructor(props) {
        super(props);

        this.handleClickMenu = this.handleClickMenu.bind(this)
    }

    handleClickMenu = (event) => {
        const { key } = event;

        switch (key) {
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };

    render() {
        const {name} = userInfo();


        const menu = (
            <Menu className="menu" selectedKeys={[]} onClick={this.handleClickMenu}>
                <MenuItem key="userCenter">
                    <Icon type="user"/>
                    Cuenta
                </MenuItem>
                <MenuItem key="userinfo">
                    <Icon type="setting"/>
                    Settings
                </MenuItem>
                <MenuItem key="triggerError">
                    <Icon type="close-circle"/>
                    Errror
                </MenuItem>
                <MenuDivider/>
                <MenuItem key="logout">
                    <Icon type="logout"/>
                    Salir
                </MenuItem>
            </Menu>

        );
        return (


            <Header style={{padding: 0}}>
                <div className="header">
                    <div className="right">
                        <Dropdown overlay={menu}>
              <span className="action account">
                <Avatar className="avatar" size="large" icon="user"/>
                <span className="name">{name}</span>
              </span>
                        </Dropdown>
                    </div>
                </div>


            </Header>
        );
    }
}

export default HeaderView;
