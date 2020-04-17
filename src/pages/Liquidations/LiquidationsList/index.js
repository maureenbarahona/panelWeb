/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T14:47:41-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Fredi Lopez
 * @Last modified time: 2018-10-23T10:22:45-06:00
 */
import React from 'react';

import { Table, Tag } from 'antd';
import moment from "moment/moment";
import padStart from 'lodash/padStart';
import { Link } from "react-router-dom";
import {FormattedNumber} from 'react-intl';

const enumStatus = {
    CANCELED: {
        text: 'Cancelado',
        color: 'red'
    },
    COMPLETED: {
        text: 'Completo',
        color: 'green'
    },
    PENDING: {
        text: 'Pendiente',
        color: 'orange'
    }
};
const columns = [
    {
        title: 'Liquidation',
        dataIndex: 'sequence',
        render: text => padStart(text, 8, '0')
    },
    {
        title: 'Fecha',
        dataIndex: 'createdAt',
        defaultSortOrder: 'ascend',
        sorter: true,
        render: text => moment(text).format('DD/MM/YYYY hh:mm a'),
    },
    //<div style={true} />
    //React.createElement("div", { style: true });
    {
        title: 'Comision',
        dataIndex: 'commission',
        align: 'right',
        render: text => (<FormattedNumber value={text}  currency="HNL"/>),
    },
    {
        title: 'Sub Total',
        dataIndex: 'subtotal',
        align: 'right',
        render: text => (<FormattedNumber value={text}  currency="HNL"/>),
    },
    {
        title: 'Impuesto',
        dataIndex: 'tax',
        align: 'right',
        render: text => (<FormattedNumber value={text}  currency="HNL"/>),
    },
    {
        title: 'Total',
        dataIndex: 'total',
        align: 'right',
        render: text => (<FormattedNumber value={text} currency="HNL"/>),
    },
    {
        title: 'Estado',
        align: 'center',
        dataIndex: 'status',
        render: text => ( <Tag color={enumStatus[text].color} key={text}>{ enumStatus[text].text}</Tag>),
    },
    {
        title: 'Detalle',
        width: 150,
        dataIndex: '_id',
        render: text => (<Link to={{pathname: `/panel/liquidations/${text}`}}>Ver Pagos</Link>),
    }
];

const LiquidationsList = (props) => {
    return (
        <Table
            simple
            bordered
            {...props}
            {...columns}
            columns={columns}
            scroll={{x: 1250}}
            rowKey={record => record._id}
        />
    );
};

export default LiquidationsList;
