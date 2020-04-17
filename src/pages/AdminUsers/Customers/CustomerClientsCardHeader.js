import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {dateTextFormat} from  '../../../utils/helpers';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const customerClientsHeader = props =>{
  const { classes, infoCustomers } = props;
  return (
    <div>
    <Card>
      <CardHeader
        style={{ textTransform: 'uppercase' }}
        className={{
          title: classes.title
        }}
        title={infoCustomers.email}
        subheader={infoCustomers._id}
      />
      <Divider />
      <CardContent>
        <Typography color='textSecondary' />
        <p />
        <div style={{ padding: 6 }}>
          <Typography component='p' variant='subtitle1'>
            <b>Cliente creado</b>
            <br />
            {dateTextFormat(infoCustomers.createdAt)}
          </Typography>
        </div>
      </CardContent>
      <CardActions />
    </Card>
  </div>
  );
}

export default withStyles(withStyles)(customerClientsHeader);
