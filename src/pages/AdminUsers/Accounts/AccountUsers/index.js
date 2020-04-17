import React from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import { NavLink } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import 'react-toastify/dist/ReactToastify.css';
import Divider from '@material-ui/core/Divider';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { sendUserAccount, getAllUserAccount } from '../../../../actions/actionsAccounts';
import AccountUsersList from './AccountUsersList';


function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const columnsUsers = ['Usuario', 'Role', 'Telefono'];

class AccountUsers extends React.Component {
  toastId = null;
  notifySuccess = messageS => {
    toast.success(messageS, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyWarn = messageW => {
    toast.warn(messageW, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  notifyError = messageE => {
    toast.error(messageE, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 9000
    });
  };
  constructor(props) {
    super(props);
    this.id_c = '';

    this.state = {
      openCard: false,
      confirmCustomer: false,
      errorTrace: '',
      errorCard: false,
      totalCard: 0,
      openDetail: false,
      openCards: false,
      dataSourceTable: {},
      blockButton: false,
      name:'',
      role:'',
      email:'',
      password:'',
      mobileNumber:'',      
      focused: '',
      formData: null,
      infoUserAccount: {}
    };
  }

  sendCard = async values => {
   // const { _id } = this.state.infoUserAccount;
    sendUserAccount(values)
    .then(res => {
      this.notifySuccess('Usuario creado exitosamente');
      this.props.refreshTable();
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        openCard: false,
        newUser: { ...res },
        number:'',
      });
    })
    .catch(err => {
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        errorTrace: err
      });
      this.notifyError(err);
      return;
    }); 
  };

  async getUserData() {
    //const { id } = this.props.match.params;
    this.setState({ loading: true });
    getAllUserAccount()
    .then(res => {
      this.setState({
        infoUserAccount: { res },
        dataSourceTable: { res },
        loading: false
      });
    })
    .catch(err => this.setState({  loading: false,
      notification: {
        message: err,
        open: true,
        variant: 'error'
      } }));

  }

  componentDidMount() {
    this.getUserData();
  }
  
  
  refreshTable = () => {
    this.getUserData();
  };

  handleClickOpen = () => {
    this.setState({ openCard: true });
  };

  onOpenModalCustomer = () => {
    const { infoUserAccount } = this.state;
    this.setState({ 
      name: infoUserAccount.name,
      role: infoUserAccount.role,
      email: infoUserAccount.email,
      password: infoUserAccount.password,
      mobileNumber: infoUserAccount.mobileNumber,
      openDetail: true, 
    });
  };

  onCloseModal = () => {
    this.setState({ openDetail: false });
  };

  onOpenErrorCard = () => {
    this.setState({ errorCard: true });
  };

  onCloseErrorCard = () => {
    this.setState({ errorCard: false });
  };

  onCloseModalCards = () => {
    this.setState({ openCards: false });
  };

  onCloseCustomer = () => {
    this.setState({ confirmCustomer: false, openDetail: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const {
      infoUserAccount,
      dataSourceTable,
    } = this.state;
     this.id_c = infoUserAccount._id;

    return (
      <div>
        <div>
          <ToastContainer />
        </div>       
        <Dialog
          open={this.state.openCard}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          <DialogTitle id='form-dialog-title'>AGREGAR USUARIOS</DialogTitle>
          <DialogContent>
          <form onSubmit={this.handleSubmit}>
          <TextField                
                autoFocus
                margin='dense'
                id='name'
                label='Nombre'
                type='name'
                fullWidth
                validators={['required']}
                errorMessages={['El nombre del usuario es requerido']}
              />
              <TextField                
                margin='dense'
                id='role'
                label='Role'
                type='role'
                fullWidth
              />
              <TextField                
                margin='dense'
                id='email'
                label='Email'
                type='email'
                fullWidth
              />
              <TextField
                margin='dense'
                id='password'
                label='Password'
                type='password'
                fullWidth
              />
              <TextField
                margin='dense'
                id='mobileNumber'
                label='Telefono celular'
                type='mobileNumber'
                fullWidth
              />
              <TextField
                margin='dense'
                id='workPhone'
                label='Telefono Trabajo'
                type='workPhone'
                fullWidth
              />  
           <Button onClick={this.onCloseModal} color='primary'>
              CANCELAR
            </Button>
            <Button 
              type='submit'
              color='primary'
            >
              AGREGAR COMERCIO
              <NavLink
                  exact
                  to='/panel/AccountDetail'
                  key='/panel/AccountDetail'
                />
            </Button>        
          </form>
          </DialogContent>         
        </Dialog>
       <div>
          <Card>
            <CardHeader
              action={
                <Button onClick={this.handleClickOpen}>+AGREGAR TARJETA</Button>
              }
              title='USUARIO'
              subheader=''
            />
            <Divider />
            <CardContent>
              <AccountUsersList
                title={'Usuarios'}
                dataSourceTable={dataSourceTable}
                columnsUsers={columnsUsers}
                refreshTable={this.refreshTable}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
export default withStyles (AccountUsers);

