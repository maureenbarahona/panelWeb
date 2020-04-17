import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {dateTextFormat} from  '../../../../utils/helpers';
import {withStyles} from '@material-ui/core/styles';


const AccountCardHeader = props =>{
  const { classes, infoAccounts } = props;
  return (
    <div>
    <Card>
      <CardHeader
        style={{ textTransform: 'uppercase' }}
        className={{
          title: classes.title
        }}
        title={infoAccounts.commercialName}
        subheader={infoAccounts._id}
      />
      <Divider />
      <CardContent>
        <Typography color='textSecondary' />
        <p />
        <div style={{ padding: 6 }}>
          <Typography component='p' variant='subtitle1'>
            <b>Cliente creado</b>
            <br />
            {dateTextFormat(infoAccounts.createdAt)}
          </Typography>
        </div>
      </CardContent>
      <CardActions />
    </Card>
  </div>
  );
}


export default withStyles(withStyles)(AccountCardHeader);
