/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T09:54:19-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T22:28:59-06:00
 */
//import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Filter from './../../components/Container/Filters';
import { Tabs, notification  } from 'antd';
import _filter from 'lodash/filter';
import LiquidationsList from './LiquidationsList';
import { authHeader } from './../../services/user';
import { headers, baseURL } from './../../services/request';


const { TabPane } = Tabs;

const EnumLiquidationsStatus ={
  PENDING: 1,
  CANCELED: 2,
  COMPLETED: 3,
};

const axiosConfig = {
    headers: {
        ...headers,
        ...authHeader()
    },
    responseType: 'json',
};



/*const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};*/


class Liquidations extends Component {

  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleCanceledClick = this.handleCanceledClick.bind(this);
    this.handleCompleteClick = this.handleCompleteClick.bind(this);
  }

  state = {
    startDate: moment('01/05/2018', 'DD/MM/YYYY'),
    endDate: moment().endOf('day'),
    data: [],
    dataSource: [],
    pagination: {},
    loading: false,
    selectedRowKeys: [],
    redirect: false,
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.getData({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  async getData() {

    this.setState({ loading: true });

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json',
    }

    const startDate = moment(this.state.startDate, 'DD/MM/YYYY').unix();
    const endDate = moment(this.state.endDate, 'DD/MM/YYYY').unix();

    try {
      const response = await axios.get(`${baseURL}/liquidations?startDate=${startDate}&endDate=${endDate}`, axiosConfig)

      const { data } = response;
      const pagination = { ...this.state.pagination };

      pagination.total = data.length;

      this.setState({
        loading: false,
        data: data,
        pagination,
      });
    } catch (error) {

      this.setState({ loading: false });
      const { response } = error;
      if (!response) {
        notification['error']({
          message: 'Error',
          description: 'Error al obtener la informacion',
        });
      } else {
      const { data } = response;
      const { message } = data;
      notification['error']({
        message: 'Error',
        description: message,
      });
      }
    }
  }

  componentDidMount () {
    this.getData();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  async handleCompleteClick () {

    this.setState({ loading: true });

    const liquidations = this.state.selectedRowKeys;

    try {
      await Promise.all(liquidations.map(async liquidationID => {
        const payload = {
          status: 'COMPLETED'
        };

        await axios.put(`${baseURL}/liquidations/${liquidationID}`, payload, axiosConfig);
      }));


      this.getData();
    } catch (error) {
      //console.log(error.json());
      this.setState({ loading: false });
      const { response } = error;

      const { data } = response;
      let { message } = data;

      if (message === 'Invalid params') {
        message = 'Error procesando transacción'
      }

      notification['error']({
        message: 'Error',
        description: message,
      });
    }
  }

  async handleCanceledClick() {

    this.setState({ loading: true });

    const liquidations = this.state.selectedRowKeys;

    try {
      await Promise.all(liquidations.map(async liquidationID => {
        const payload = {
          status: 'CANCELED'
        };

        await axios.put(`${baseURL}/liquidations/${liquidationID}`, payload, axiosConfig);
      }));


      this.getData();
    } catch (error) {
      //console.log(error.json());
      this.setState({ loading: false });
      const { response } = error;


      const { data } = response;
      let { message } = data;

      if (message === 'Invalid params') {
        message = 'Error procesando transacción'
      }

      notification.error({
        message: 'Error',
        description: message,
      });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/liquidations' />
    }
  }

  handleTabChange (activeKey) {
  }

  render(){
        

    const liquidationsProps = {
      loading: this.state.loading,
      pagination: this.state.pagination,
    };

    const filterProps = {
      rangePickerProps: {
        defaultValue: [this.state.startDate, this.state.endDate],
        onChange: (key, value) => {
          const [ startDate, endDate ] = value;

          this.setState({ startDate,  endDate });
        }
      },
      buttonProps: {
        onClick: () => {
          this.getData();
        }
      }
    };

    return (
       <div>

         <Filter {...filterProps}></Filter>

         <div className="card-container">
           <Tabs type="card">
             <TabPane tab="Pendientes" key={String(EnumLiquidationsStatus.PENDING)}>



               <LiquidationsList {...liquidationsProps}  dataSource={_filter(this.state.data, {status: 'PENDING'})}></LiquidationsList>
             </TabPane>

             <TabPane tab="Completadas" key={String(EnumLiquidationsStatus.COMPLETED)}>
               <LiquidationsList {...liquidationsProps} dataSource={_filter(this.state.data, {status: 'COMPLETED'})}></LiquidationsList>
             </TabPane>

             <TabPane tab="Canceladas" key={String(EnumLiquidationsStatus.CANCELED)}>
               <LiquidationsList {...liquidationsProps} dataSource={_filter(this.state.data, {status: 'CANCELED'})}></LiquidationsList>
             </TabPane>
           </Tabs>
         </div>
       </div>
     );
   }
 }

 export default Liquidations;
