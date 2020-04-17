import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const accountCardService = props =>{
  const { openModalService, infoAccounts } = props;
  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={openModalService}>
              <EditIcon />
            </IconButton>
          }
          title='SERVICIOS'
          subheader=''
        />
        <Divider />
        <CardContent>
          <div style={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>Balance:</b>
                  {infoAccounts.balance}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>
                    Limite de transacciones diarias:
                  </b>
                  {infoAccounts.diaryTransactionLimit}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>Transacciones Minimas:</b>
                  {infoAccounts.transactionMin}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>Transacciones Maximas:</b>
                  {infoAccounts.transactionMax}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>Num. Agencias:</b>
                  {infoAccounts.branch}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>
                    Total de transacciones diarias:
                  </b>
                  {infoAccounts.diaryTotalTransaction}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>API:</b>
                  {infoAccounts.api}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ padding: 6 }}>
                <Typography component='p'>
                  <b style={{ paddingRight: 6 }}>Contrato:</b>
                  {infoAccounts.contract}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div style={{ padding: 6 }}>
                  <Typography component='p'>
                    <b style={{ paddingRight: 6 }}>
                      Procesador por defecto :
                    </b>
                    {infoAccounts.paymentProvider}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ padding: 6 }}>
                  <Typography component='p'>
                    <b style={{ paddingRight: 6 }}>Comision :</b>
                    {infoAccounts.commissionRate}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ padding: 6 }}>
                  <Typography component='p'>
                    <b style={{ paddingRight: 6 }}>Impuesto :</b>
                    {infoAccounts.taxRate}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default withStyles(withStyles)(accountCardService);
