/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:01:00-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-29T09:53:54-06:00
 */
import React, {Component} from 'react';
import {Menu} from 'antd';
import { userInfo } from '../../../services/user';
import { NavLink, withRouter } from "react-router-dom";

const {Item, ItemGroup} = Menu;

class BaseMenu extends Component {
    constructor(props) {
        super(props);

        const { pathname: current } = this.props.location;

        this.state = {
            current
        };

        this.onClick = this.onClick.bind(this);
    }

    state = {
        current: '/panel/dashboard',
        loading: false
    };

    onClick = (event) => {
        const { key } = event;

        this.setState({
            current: key
        });
    };

    render() {
        const { current } = this.state;
        const { role } = userInfo();

        return (
            <Menu
                defaultSelectedKeys={[current]}
                //selectedKeys={[current]}
                key='Menu'
                mode='inline'
                onClick={this.onClick}
                className='horizontal'>

                <ItemGroup title="TRANSACCIONES">
                    <Item key="/panel/dashboard"><NavLink to="/panel/dashboard" key="/panel/dashboard">Ver transacciones</NavLink></Item>
                    <Item key="/panel/liquidations"><NavLink to="/panel/liquidations" key="/panel/liquidations">Liquidaciones</NavLink></Item>
                </ItemGroup>

                { role === 'SUPER_USER'
                    ?
                    (
                        <ItemGroup title="CLIENTES">
                            <Item key="/panel/accounts"><NavLink to="/panel/accounts" key="/panel/accounts">Clientes</NavLink></Item>
                        </ItemGroup>
                    )
                    : null
                }
            </Menu>
        );
    }
}

export default withRouter(BaseMenu);
