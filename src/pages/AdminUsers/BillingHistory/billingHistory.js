import axios from 'axios';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { authHeader } from '../../../services/user';
import { dateFormat } from '../../../utils/helpers.js';
import Filter from '../../../components/Container/Filters';
import { headers, baseURL } from '../../../services/request';
import EnhancedTable from '../../../components/Tables/EnhancedTable';
import SearchBar from '../../../components/Container/Header/SearchBar';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import {
  startDateFormat,
  endDateFormat,
  startDateOf,
  endDateOf,
  dateUnixFormat,
  dateUnixFormat2,
} from '../../../utils/helpers';

let billProductsArray = [];
let myStartDate;
let myEndDate;

const columns = [
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'FECHA' },
  { id: 'client', numeric: false, disablePadding: true, label: 'CLIENTE' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'MONTO TOTAL' },
  {
    name: 'DESCRIPCION',
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const billIndex = tableMeta.rowIndex;
        const billProducts = billProductsArray[billIndex];
        return (
          <div style={{ flexGrow: 1 }}>
            <Paper style={{ width: '100%', marginTop: 5, overflowX: 'auto' }}>
              <Table style={{ minWidth: 50 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCTO</TableCell>
                    <TableCell align='right'>CANTIDAD</TableCell>
                    <TableCell align='right'>PRECIO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billProducts.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.quantity}</TableCell>
                      <TableCell align='right'>{`L ${row.price.toLocaleString(
                        navigator.language,
                        { minimumFractionDigits: 2 }
                      )}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        );
      }
    }
  }
];

class BillingHistory extends Component {
  getMuiTheme = () => TableFormat;

  state = {
    startDate: startDateOf(),
    endDate: endDateOf(),
    dataSource: [],
    dataSourceOriginal: [],
    loading: false,
    notification: '',
    name: ''
  };

  filterProps = {
    disableButton: true,
    loading: this.state.loading,
    rangePickerProps: {
      defaultValue: [this.state.startDate, this.state.endDate],
      onChangeStart: event => {
        myStartDate = startDateFormat(event.target.value);
        this.getData();
      },
      onChangeEnd: event => {
        myEndDate = endDateFormat(event.target.value);
        this.getData();
      }
    },
    buttonProps: {
      onClick: () => {
        this.getData();
      }
    }
  };

  componentDidMount() {
    myStartDate = startDateOf();
    myEndDate = endDateOf();
    this.getData();
  }

  handleChange = e => {
    const value = e.target.value.toLowerCase();
    let filteredData = this.state.dataSourceOriginal;
    if (value !== '') {
      filteredData = filteredData.filter(bill =>
        bill.name.toLowerCase().includes(value)
      );
  
      this.setState({
        dataSource: filteredData
      });
    } else
      this.setState({
        dataSource: this.state.dataSourceOriginal
      });
  };
  

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  async getData() {

    this.setState({ loading: true });
    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };
    const startDate = dateUnixFormat(myStartDate);
    const endDate = dateUnixFormat(myEndDate);


    try {
      let dataSource;
      if (this.state.name !== '') {
        let data = await axios.get(
          `${baseURL}/orderPayment?name=${this.state.name}&startDate=${startDate}&endDate=${endDate}`,
          axiosConfig
        );
        dataSource = data;
        
      }
      if (this.state.name === '') {
        let { data } = await axios.get(
          `${baseURL}/orderPayment?startDate=${startDate}&endDate=${endDate}`,
          axiosConfig
        );
        dataSource = data;
      }
      dataSource = dataSource.map(bill => {
        billProductsArray.push(bill.products);

        return {
          products: bill.products,
          createdAt: dateFormat(bill.createdAt),
          name: bill.name,
          amount: `L ${bill.amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}`
        };
      });

      this.setState({
        dataSource,
        dataSourceOriginal: dataSource
      });
    } catch (error) {
      const { response } = error;

      let message = 'Error de conexión';
      if (response) {
        const { data } = response;
        message = data.message;
      }

      this.setState({
        loading: false,
        notification: {
          message,
          open: true,
          variant: 'error'
        }
      });
    }
  }

  render() {
    const dataSourceC = this.state.dataSource.map(item => {
      return [
        dateUnixFormat2(item.createdAt),
        item.name,
        item.amount,
        item.products
      ];
    });
    return (
      <div>
        <div style={{ marginLeft: 5, color: 'gray' }}>
          <p1></p1>
        </div>
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <SearchBar placeholder='Buscar...' onChange={this.handleChange} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, margin: '0 0 -60px 0' }}>
          <Filter {...this.filterProps}></Filter>
        </div>
        <div style={{}}>
          <EnhancedTable title={''}
              data={dataSourceC}
              columns={columns}/>
        </div>
      </div>
    );
  }
}

export default BillingHistory;

