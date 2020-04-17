import React from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {dateTextFormat} from  '../../../utils/helpers';



const subscriberIdCardHeader = props =>{
  const { classes, infoSubscriber } = props;  
  
  console.log(infoSubscriber);
 //let  resp = infoSubscriber['0'];

  //console.log(resp);
  
  
   if (infoSubscriber !=='undefined'){
    let  resp = infoSubscriber['0'];
    console.log (resp);
    const name = resp.name;
   return (
    <div>
    <Card>
      <CardHeader
        style={{ textTransform: 'uppercase' }}
        className={{
          title: classes.title
        }}
        title={'infoSubscriber.name'}
        subheader={'infoSubscriber._id'}
      />
      <Divider />
      <CardContent>
        <Typography color='textSecondary' />
        <p />
        <div style={{ padding: 6 }}>
          <Typography component='p' variant='subtitle1'>
            <b>Cliente creado</b>
            <br />
            
          </Typography>
        </div>
      </CardContent>
      <CardActions />
    </Card>
  </div>
  );
      }
}


export default withStyles(withStyles)(subscriberIdCardHeader);
