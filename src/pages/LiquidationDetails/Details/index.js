/**
 * @Author: Fredi Lopez
 * @Date:   2018-10-27T11:24:49-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-20T07:38:45-06:00
 */
import React from 'react';
import moment from 'moment';
import { FormattedNumber } from 'react-intl';
import TableGrid from './../../../components/Container/TableGrid';
import {  Row, Col  } from 'antd';



const columns = [
   {
     title: 'Transacción',
     dataIndex: 'transactionID',
     width: 150,
   },
   {
     title: 'Fecha',
     dataIndex: 'createdAt',
     render: text => moment(text).format('DD/MM/YYYY hh:mm a'),
   },
   {
     title: 'Descripción',
     dataIndex: 'description',
   },
   {
     title: 'Tarjeta',
     dataIndex: 'safeIdentifier',
     render: text => `**** **** **** ${text}`,
   },
   {
     title: 'Subtotal',
     dataIndex: 'subtotal',
     align: 'right',
     render: text => (<FormattedNumber value={text}  currency="HNL" />),
   },
   {
     title: 'ISV',
     dataIndex: 'tax',
     align: 'right',
     render: text => (<FormattedNumber value={text}  currency="HNL" />),
   },
   {
     title: 'Total',
     dataIndex: 'amount',
     align: 'right',
     render: text => (<FormattedNumber value={text}  currency="HNL" />),
   }
 ];

 const Details = ({ loading, payments, subtotal, neto, tax, commission, total}) => {
   return (
     <div>
     <strong>Transacciones</strong>
      <TableGrid
        loading={loading}
        columns={columns}
        dataSource={payments}
        pagination={false} />

        <div>
          <Row>
            <Col span={16}></Col>
            <Col span={4}>
              <div style={{float: 'right'}}>Neto</div>
            </Col>
            <Col span={4}>
              <strong style={{float: 'right'}}>
                <FormattedNumber value={neto || 0}  currency="HNL" />
              </strong>
            </Col>
          </Row>
          <Row>
            <Col span={16}></Col>
            <Col span={4}>
              <div style={{float: 'right'}}>(-) Comisiones</div>
            </Col>
            <Col span={4}>
              <strong style={{float: 'right'}}>
                <FormattedNumber value={commission || 0}  currency="HNL" />
              </strong>
            </Col>
          </Row>
          <Row>
            <Col span={16}></Col>
            <Col span={4} >
              <strong style={{float: 'right'}}>Subtotal</strong>
            </Col>
            <Col span={4}>
              <strong style={{float: 'right'}}>
                <FormattedNumber value={subtotal || 0}  currency="HNL" />
              </strong>
            </Col>
          </Row>

          <Row>
            <Col span={16}></Col>
            <Col span={4}>
              <div style={{float: 'right'}}>ISV</div>
            </Col>
            <Col span={4}>
              <strong style={{float: 'right'}}>
                <FormattedNumber value={tax || 0}  currency="HNL" />
              </strong>
            </Col>
          </Row>
          <Row>
            <Col span={16}></Col>
            <Col span={4}>
              <div style={{float: 'right', fontSize: '20px',  color: '#F8931D'}}>TOTAL</div>
            </Col>
            <Col span={4} >
              <strong style={{float: 'right', fontSize: '20px',  color: '#F8931D'}}>
                <FormattedNumber value={total || 0}  currency="HNL" />
              </strong>
            </Col>
          </Row>
        </div>
      </div>
   )
 }

 export default Details;
