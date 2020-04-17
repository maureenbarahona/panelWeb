import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const styles = theme => ({
  p: { fontweight: 'bold' },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  label: {
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class CustomersModal extends React.Component {
  constructor(args) {
    super(args);
    this.state = {};
  }
  state = {
    open: false,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    message: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  save(e) {
    this.setState({
      message: this.state.firstName
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            {'AGREGAR CLIENTE'}
          </DialogTitle>
          <DialogContent>
            <div>
              <label htmlFor='email'>Correo</label>

              <input
                value={this.state.email}
                onChange={this.onChange.bind(this)}
                name='email'
                id='email'
                type='text'
              />
              <p />
              <label htmlFor='firstName'>Nombres</label>
              <input
                value={this.state.firstName}
                onChange={this.onChange.bind(this)}
                name='firstName'
                id='firstName'
                type='text'
              />
              <p />
              <label htmlFor='lastName'>Apellidos</label>
              <input
                value={this.state.lastName}
                onChange={this.onChange.bind(this)}
                name='lastName'
                id='lastName'
                type='text'
              />
               <p />
              <label htmlFor='mobileNumber'>Teléfono</label>
              <input
                value={this.state.mobileNumber}
                onChange={this.onChange.bind(this)}
                name='mobileNumber'
                id='mobileNumber'
                type='number'
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              CANCELAR
            </Button>
            <Button onClick={this.save.bind(this)} color='primary'>
              AGREGAR CLIENTES
            </Button>
            <span>{this.state.message}</span>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomersModal);
