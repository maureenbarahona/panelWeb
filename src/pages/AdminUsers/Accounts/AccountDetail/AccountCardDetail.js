import React from 'react';
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const accountCardDetail = props =>{
  const { openModalDetail, infoAccounts } = props;
  return (
      <div>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={openModalDetail}>
              <EditIcon />
            </IconButton>
          }
          title='DETALLES'
        />
        <Divider />
        <CardContent>
          <Typography color='textSecondary' gutterBottom />
          <Typography variant='h4' component='h2' />

          <Typography color='textSecondary' />
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}>ID:</b>
              {infoAccounts.rtn}
            </Typography>
          </div>
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}>Representante:</b>
              {infoAccounts.legalContact}
            </Typography>
          </div>
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}>Email:</b>
              {infoAccounts.email}
            </Typography>
          </div>
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}> Telefono:</b>
              {infoAccounts.phoneNumber}
            </Typography>
          </div>
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}>URL:</b>
              {infoAccounts.url}
            </Typography>
          </div>
          <div style={{ padding: 6 }}>
            <Typography component='p'>
              <b style={{ paddingRight: 6 }}>Direccion:</b>
              {infoAccounts.address}
            </Typography>
          </div>
        </CardContent>
        <CardActions />
      </Card>
    </div>
  );

}


export default withStyles(withStyles)(accountCardDetail);
