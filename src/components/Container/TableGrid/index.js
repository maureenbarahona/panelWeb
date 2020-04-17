/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:03:40-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-28T14:03:13-06:00
 */
import React from 'react';
import { Table } from 'antd';

const TableGrid = (props) => {
  return (
    <Table
      simple
      bordered
      {...props}
      scroll={{ x: 1250 }}
      rowKey={record => record._id}
    />
  );
}

export default TableGrid;
