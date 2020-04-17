import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const billingCardHeader = props => {
  const { classes, onOpenModal} = props;
  return (
    <div>
      <Card>
        <CardContent>
          <Button
            onClick={onOpenModal}
            variant='contained'
            color='primary'
            className={classes.button}
            style={{
              background: '#F7931D',
              border: '#F7931D',
              marginBottom: 10
            }}
          >
            AGREGAR PRODUCTO
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(withStyles)(billingCardHeader);
