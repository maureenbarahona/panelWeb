
import axios from 'axios/index';
import moment from 'moment/moment';
import React, {Component} from 'react';
import AccountsList from './AccountsList';
import 'react-toastify/dist/ReactToastify.css';
import { authHeader } from '../../services/user';
import { baseURL, headers } from '../../services/request';
import { ToastContainer, toast } from 'react-toastify';


const columns = [
    { id: 'accountName', numeric: false, disablePadding: true, label: 'COMERCIO' },
    { id: 'status', numeric: false, disablePadding: false, label: 'ESTADO' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'CREADO' },
];

class Accounts extends Component {
    
    constructor(props) {
        super(props);

        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }
    notifySuccess = messageS => {
        toast.success(messageS, {
          position: toast.POSITION.TOP_CENTER
        });
      };
    
      notifyWarn = messageW => {
        toast.warn(messageW, {
          position: toast.POSITION.BOTTOM_CENTER
        });
      };
    
      notifyError = messageE => {
        toast.error(messageE, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false
        });
      };
    

    state = {
        loading: false,
        dataSource: [],
        endDate: moment().endOf('day'),
        startDate: moment().startOf('month'),
    };

    componentDidMount() {
        this.getData();
    }

    async getData() {

        this.setState({ loading: true });

        const axiosConfig = {
            headers: {
                ...headers,
                ...authHeader()
            },
            responseType: 'json',
        };

        try {
            const { data } = await axios.get(`${baseURL}/accounts`, axiosConfig);

            const dataSource = data.map(account => {
                return {
                    accountName: account.displayName
                }
            });

            this.setState({
                dataSource,
                loading: false,
            });

        } catch (error) {
            this.setState({ loading: false });

            const {response} = error;
            let message = 'Error de conexión';
            if (response) {
                const {data} = response;
                message = data.message;
            }
            this.notifyError(message);
        }
    }

    render() {
        const { loading, dataSource } = this.state;

        const accountsProps = {
            columns,
            loading,
            dataSource,
        };

        return (
            <div>
                <ToastContainer />
                <AccountsList {...accountsProps}></AccountsList>
            </div>
        );
    }
}

export default Accounts;
