import moment from 'moment';
import styles from './index.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularLoading from '../../../../components/Loading';
import { getOneAccount } from '../../../../actions/actionsAccounts.js';


class AccountProfile extends Component {
  state = {
    accountID: '',
    loading: false,
    infoUserAccount: '',
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const { id } = params;

    this.setState({ accountID: id });

    this.getData(id);
  }

  async getData(accountID) {
    this.setState({ loading: true });
    getOneAccount()
    .then(res => {
      this.setState({
        infoUserAccount: res ,
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

  render() {
    const { loading, infoUserAccount } = this.state;
    const { classes } = this.props;

    const {

      balance,
      commercialName,
      contactPhoneNumber,
      contract,
      createdAt,
      displayName,
      email,
      idNumberContact,
      isActive,
      legalContact,
      monthlyFee,
      paymentProvider,
      phoneNumber,
      rtn,
      rtnContact,
      updatedAt,
      _id,
      
    } = infoUserAccount;
    let user = JSON.parse(sessionStorage.getItem('user'));
    return (
      <div>
        <Card className={classes.card} style={{marginTop:15}}>
          <CardHeader
            title='INFORMACIÓN GENERAL DE CUENTA'
          />
          <Divider />
          <CardContent>
            {loading ? (
              <CircularLoading />
            ) : (
              <div>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Nombre Comercial: {commercialName}
                </Typography>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Telefono Celular: {phoneNumber}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  RTN: {rtn}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                 ID: {_id}
                </Typography>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Cuenta: {isActive ? 'ACTIVA' : 'INACTIVA'}
                </Typography>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Fecha de creacion: {moment(createdAt).format('DD MMM YYYY')}
                </Typography>
                  
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Fecha de modificado: {moment(updatedAt).format('DD MMM YYYY')}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className={classes.card} style={{marginTop:15}}>
          <CardHeader
            title='INFORMACIÓN DE CONTACTO'
          />
          <Divider />
          <CardContent>
            {loading ? (
              <CircularLoading />
            ) : (
              <div>
              <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Nombre: {displayName}
                </Typography>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Correo: {email}
                </Typography>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Telefono de Contacto: {contactPhoneNumber}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  RTN de Contacto: {rtnContact}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  ID Contacto: {idNumberContact}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>  
        <Card className={classes.card} style={{marginTop:15}}>
          <CardHeader
            title='DETALLES DE CUENTA'
          />
          <Divider />
          <CardContent>
            {loading ? (
              <CircularLoading />
            ) : (
              <div>
              <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Balance: {balance}
                </Typography> 

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Contrato: {contract}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Contacto Legal: {legalContact}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Cobro Mensual: {monthlyFee}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Proveedor de Pagos: {paymentProvider}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card> 

        <Card className={classes.card} style={{marginTop:15}}>
          <CardHeader title={'TOKEN DE CUENTA'} > </CardHeader> 
          <a href='https://drive.google.com/file/d/1hCdJ7zsJbMLyPhKaT_niGcIK5nT6HZy7/view?usp=sharing' target='blank'><b style={{padding:20,marginTop:15}}>Este es tu token, quieres saber como utilizarlo da click aqui</b></a>         
          <Divider />
          <Grid container>
            <p style={{margin: 15, width:'50px', flexGrow:1, padding:0,position: 'relative', wordWrap: 'break-word',}}>
              {user.token}
            </p>
          </Grid>
        </Card>

      </div>
    );
  }
}

AccountProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
