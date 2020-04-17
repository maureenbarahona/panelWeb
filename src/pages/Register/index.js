import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import logo from './../../assets/images/logo.svg';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {notifySuccess, notifyError, ToastContainerR} from '../../components/Container/Alert/index';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  sendInfoAccount , sendUserAccount
} from '../../actions/actionsAccounts';
import { getLogin } from '../../actions/actionsLogin';


class Register extends React.Component {

  state = {
    redirectToEdit: false,
    newAccount: {},
    sendInfo: false,
    loading: false,
    dataSource: [],
    error: [],
    open: false,
    paymentProvider: 'CREDOMATIC',
    role: 'ADMIN_USER',
    idAccount :'',
    infoAccounts: {
      displayName: '',
      isActive: true,
      email: '',
      balance: 0,
      commercialName: '',
      paymentProvider: '',
      phoneNumber: '',
      rtn: '',
      diaryTransactionLimit: 0,
      diaryTotalTransaction:0,
      transactionMin: 0,
      transactionMax: 0,
      branch: 0,
      address: '',
      url:'',
      legalContact:'',
      rtnContact:'',
      contract:''
    },
    responseSendAccount: '',
    notification: {
      open: false,
      message: '',
      variant: ''
    },
    message: ''
  };

  login = async => {
    getLogin('fredisu@paygate.biz', 'david1994')
      .then(res => {
        this.setState({
          dataSource: res,
          loading: false
        });

        sessionStorage.setItem('user', JSON.stringify(res.response.data));
  
      })
      .catch(err => {
        this.setState({
          error: err,
          submitted: false,
          sendButtonDisabled: false
        });
      });


  };

  authHeader =() =>{
    let user = JSON.parse(sessionStorage.getItem('user'));
  
    if (user && user.token) {
      return { 'Authorization': 'Bearer ' + user.token, 'Content-Type': 'application/json' };
    } else {
      return {};
    }
  };


  onValidateSendInfo = (pinfoAccount) =>{   
    
    if ( pinfoAccount.displayName.length < 1) {
      notifyError('Nombre del comercio es requerido');
      return;
    }
    if (pinfoAccount.commercialName.length < 1) {
      notifyError('Nombre comercial es requerido');
      return;
    }
    if (pinfoAccount.email.length < 1) {
      notifyError('email es requerido');
      return;
    }
    if (pinfoAccount.paymentProvider.length < 1) {
      notifyError('Proveedor del pago es requerido');
      return;
    }
    if (pinfoAccount.phoneNumber.length < 1) {
      notifyError('Numero de telefono principal es requerido');
      return;
    }
    if (pinfoAccount.rtn.length < 1) {
      notifyError('rtn es requerido');
      return;
    }
    if (pinfoAccount.branch.length < 1) {
      notifyError('Numero de agencias es requerido');
      return;
    }
    if (pinfoAccount.diaryTotalTransaction.length < 1) {
      notifyError('Total de transacciones diarias es requerido');
      return;
    }
    if (pinfoAccount.transactionMin.length < 1) {
      notifyError('Transacciones minimas  es requerido');
      return;
    }
    if (pinfoAccount.transactionMax.length < 1) {
      notifyError('Transacciones maximas es requerido');
      return;
    }
    if (pinfoAccount.diaryTransactionLimit.length < 1) {
      notifyError('limite de transacciones diarias es requerido');
      return;
    }
    if (pinfoAccount.address.length < 1) {
      notifyError('direccion es requerida');
      return;
    }      
 
    return true;

};

sendInfo = async values => {
  sendInfoAccount(values)
    .then(res => {
      notifySuccess('Comercio creado exitosamente');
      this.setState({
        submitted: false,
        sendButtonDisabled: false,
        redirectToEdit: true,
        newAccount: res,
        loading: false,
        idAccount: res._id
      });
    })
   
    .catch(err => {
      this.setState({
        error: err,
        submitted: false,
        sendButtonDisabled: false
      });
      notifyError(err.toString());
      return;
    });
};

sendUserInfo = async values => {
  sendUserAccount(values)
    .then(res => {
      this.setState({
        open: false
      });
      this.getUserData();
      this.notifySuccess('Usuario creado exitosamente');
      return;
    })
    .catch(err => {
      this.setState({
        error: err,
        submitted: false,
        sendButtonDisabled: false
      });
      this.notifyError(err.toString());
      return;
    });
};

onSubmitUser = e =>{
  e.preventDefault();
  const target = e.currentTarget;

  const infoUserAccount ={
    name: target.displayName.value,
    role: this.state.role,
    email: target.email.value,
    password: target.password.value,
    mobileNumber: target.phoneNumber.value,
    workPhone: target.phoneNumber.value,
    account: this.state.idAccount
  };

  this.sendUserInfo(infoUserAccount);
}
  onSubmit = e => {
    e.preventDefault();
    const target = e.currentTarget;

    const infoAccount ={
      displayName: target.displayName.value,
      commercialName: target.commercialName.value,
      email: target.email.value,
      paymentProvider: this.state.paymentProvider,
      phoneNumber: target.phoneNumber.value,
      rtn: target.rtn.value,
      branch: parseInt(target.branch.value),
      diaryTotalTransaction: parseInt(target.diaryTotalTransaction.value),
      transactionMin: parseInt(target.transactionMin.value),
      transactionMax: parseInt(target.transactionMax.value),
      diaryTransactionLimit: parseInt(target.diaryTransactionLimit.value),
      address: target.address.value,
      url: target.url.value,
      legalContact: target.legalContact.value,
      rtnContact: target.rtnContact.value
    };


      
    if (this.onValidateSendInfo(infoAccount)){
      this.sendInfo(infoAccount);
    }
  };

  componentDidMount() {
    this.login();
    this.authHeader();
  }

  render() {
    const { classes } = this.props;
    return (

      <div className='root'>
         <div>
          <ToastContainerR/>
        </div>
        <div>
          <main>
            <CssBaseline />
            <Paper className='paper'>
              <div className='logo'>
                <img style={{ marginTop: 50 }} alt='logo' src={logo} />
              </div>
              <div>
                <Typography
                  style={{ marginBottom: 20 }}
                  className='logo'
                  component='h1'
                  variant='h4'
                >
                  Sign up
                </Typography>
              </div>
              <div className='root'>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Paper className='paper' />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className='paper'>
                      <div className={classes.textField} >
                        <Typography
                          style={{ marginTop: 10, marginBottom: 10 }}
                          className='logo'
                          component='h4'
                          variant='h5'
                        >
                          Datos del Comercio
                        </Typography>
                      </div >
                      <form className='login-form' onSubmit={this.onSubmit}>
                        <Paper style={{ margin: 20 }}>
                          <TextField
                            className={classes.textField}
                            autoFocus
                            id='displayName'
                            label='Nombre del comercio'
                            type='name'
                            fullWidth
                            variant='outlined'
                            required
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='email'
                            label='Email'
                            type='email'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='commercialName'
                            label='Nombre Comercial'
                            type='commercialName'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='phoneNumber'
                            label='Telefono principal'
                            type='phoneNumber'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='rtn'
                            label='RTN'
                            type='rtn'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='diaryTransactionLimit'
                            label='Limite de transacciones diarias'
                            type='number'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='transactionMin'
                            label='Minimo de transacciones'
                            type='number'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='transactionMax'
                            label='Maximo de transacciones'
                            type='number'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='branch'
                            label='Sucursales'
                            type='number'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='diaryTotalTransaction'
                            label='Total transacciones diarias'
                            type='number'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            id='address'
                            label='Direccion'
                            type='address'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            id='url'
                            label='URL'
                            type='url'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            id='legalContact'
                            label='Contacto Legal'
                            type='legalContact'
                            fullWidth
                          />
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            id='rtnContact'
                            label='Id Contacto Legal'
                            type='rtnContact'
                            fullWidth
                          />
                        </Paper>

                        <div>
                          <Typography
                            className='logo'
                            component='h3'
                            variant='h5'
                          >
                            Datos del Usuario
                          </Typography>
                        </div>
                        <Paper style={{ margin: 20 }}>
                          <TextField
                            className={classes.textField}
                            variant='outlined'
                            required
                            fullWidth
                            id='user'
                            label='Usuario'
                            name='user'
                            autoComplete='lname'
                          />
                          <TextField 
                            className={classes.textField}                           
                            variant='outlined'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'

                          />
                        </Paper>
                        <div style={{ margin: 20 }}>
                          <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                          >
                            Sign Up
                          </Button>
                        </div>
                      </form>
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className='paper' />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </main>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
