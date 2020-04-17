import axios from 'axios';
import moment from 'moment';
import styles from './index.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import { authHeader } from '../../../services/user';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularLoading from '../../../components/Loading';
import { baseURL, headers } from '../../../services/request';

class AccountDetails extends Component {
  state = {
    accountID: '',
    loading: false
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

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      const { data } = await axios.get(
        `${baseURL}/accounts/${accountID}`,
        axiosConfig
      );

      this.setState({
        data,
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, loading } = this.state;
    const { classes } = this.props;

    const {
      _id,
      url = 'https://',
      email = '---',
      address = '---',
      createdAt,
      phoneNumber = '---',
      displayName = '---',
      rtn = '---',
      contactName = '---'
    } = data || {};
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader title={displayName} subheader={rtn} />

          <Divider />

          <CardContent>
            <Typography
              className={classes.title1}
              color='textSecondary'
              guttertop
            >
              Cliente creado
            </Typography>
            <Typography className={classes.pos} component='p'>
              {moment(createdAt).format('DD MMM YYYY')}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardHeader
            title='DETALLES'
            action={
              <IconButton>
                <EditIcon />
              </IconButton>
            }
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
                  ID: {_id}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Representante: {contactName}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Email: {email}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Teléfono: {phoneNumber}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  URL: {url}
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Dirección: {address}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardHeader
            title='SERVICIOS'
            action={
              <IconButton>
                <EditIcon />
              </IconButton>
            }
          />

          <Divider />

          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Fee mensual: $700
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Set Up Fee: $1,000
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Email: email@email.com
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Monto Trx Mínimo: L50.00
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Monto Trx Máximo: L50,000.00
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  API: Si
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Hosted: No
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Suscripciones: Si
                </Typography>

                <Typography
                  className={classes.title2}
                  color='textSecondary'
                  guttertop
                >
                  Guardar tarjetas: Si
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardHeader
            title='CONFIGURACIÓN'
            action={
              <IconButton>
                <EditIcon />
              </IconButton>
            }
          />

          <Divider />

          <CardContent>
            <Grid container spacing={12}>
              <Grid item xs={12} style={{ marginRight: '20px' }}>
                <Grid item>
                  <Typography className={classes.title0} color='textSecondary'>
                    PERMISOS
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    Private key: 980280748BKJDFIUHADF9823
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    Public Key: añdhjñfakjh2347298AHDFJADF
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    className={classes.title0}
                    style={{ marginTop: '30px' }}
                    color='textSecondary'
                  >
                    BANCO
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    Banco: Banco Atlantida
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    ACH: L35
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item>
                  <Typography
                    className={classes.title0}
                    style={{ marginTop: '30px' }}
                    color='textSecondary'
                  >
                    TARJETAS
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    VISA: 3.5%, $0.18
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    MASTER CARD: 3.5%, $0.18
                  </Typography>

                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    AMEX: 0.0%, $0.10
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    className={classes.title2}
                    color='textSecondary'
                    guttertop
                  >
                    ACTIVO: SI
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountDetails);
