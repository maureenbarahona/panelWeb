import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import icono1 from '../../../assets/clintickets/icon1.png';
import icono2 from '../../../assets/clintickets/icon2.png';
import {withStyles} from '@material-ui/core/styles';
import cardsIcon from '../../../assets/clintickets/cardIcons.png';


const billingForm = props => {
  const {
    classes,
    handleSubmitValidation,
    termsConditions,
    handleCheckBox,
    sendButtonDisabled,
    handleExpiry
  } = props;
  return (
    <div >
        <Card>
        <CardContent>
      <form onSubmit={handleSubmitValidation}>
        <div
          style={{
            flexGrow: 1,
            marginTop: 15,
            marginRight: 15,
            marginLeft: 15
          }}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Paper
                style={{
                  padding: 5,
                  textAlign: 'center',
                  height: '100%',
                  width: '100%'
                }}
              >
                <div style={{ marginTop: 15 }} />
                <div>
                  <img src={icono1} alt='icono1' /> <b>INFORMACIÓN DE PAGO</b>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 15
                  }}
                >
                  <div style={{ margin: 25 }}>
                    <TextField
                      id='safeIdentifierForm'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='NÚMERO DE TARJETA'
                      type='number'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div style={{ marginTop: 15 }} />
                    <TextField
                      style={{
                        flexWrap: 'wrap',
                        display: 'flex'
                      }}
                      id='validTrhuForm'
                      className={classes.textField}
                      
                      name='expiry'
                      placeholder='MM/YY'
                      pattern='\d\d/\d\d'
                      variant='outlined'
                      margin='normal'
                      label='FECHA DE EXPIRACIÓN'
                      type='tel'
                      required
                      fullWidth
                      onChange={handleExpiry}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div style={{ marginTop: 15 }} />
                    <TextField
                      id='cvvForm'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='CÓDIGO DE SEGURIDAD'
                      type='number'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div style={{ marginTop: 15 }} />
                    <TextField
                      id='nameForm1'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='NOMBRE TITULAR'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </div>
                <img src={cardsIcon} alt='logo' />
                <div style={{ marginTop: 15 }} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                style={{
                  padding: 5,
                  textAlign: 'center',
                  height: '100%',
                  width: '100%'
                }}
              >
                <div style={{ marginTop: 15 }} />
                <div>
                  <img src={icono2} alt='icono1' /> <b>INFORMACIÓN PERSONAL</b>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: 15
                  }}
                >
                  <div style={{ margin: 25 }}>
                    <TextField
                      id='nameForm2'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='NOMBRE COMPLETO'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div style={{ marginTop: 15 }} />
                    <TextField
                      id='emailForm'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='CORREO ELECTRÓNICO'
                      type='email'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <div style={{ marginTop: 15 }} />
                    <TextField
                      id='phoneNumberForm'
                      className={classes.textField}
                      variant='outlined'
                      margin='normal'
                      label='NÚMERO DE TELEFONO'
                      type='number'
                      required
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: 5, textAlign: 'center' }}>
                <br />
                Acepto los{' '}
                <strong style={{ color: '#000000' }} href=''>
                  {' '}
                  {'Términos y Condiciones  :'}{' '}
                </strong>
                <input
                  id='termsConditions'
                  type='checkbox'
                  checked={termsConditions}
                  onChange={handleCheckBox}
                  required
                />
                <br />
                <Button
                  disabled={sendButtonDisabled}
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  style={{
                    background: '#F7931D',
                    border: '#F7931D',
                    margin: 15
                  }}
                  type='submit'
                >
                  REALIZAR COMPRA
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </form>
      </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(withStyles)(billingForm);
