
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
    marginBottom: "10px"
  },
  textField: {
    marginLeft: theme.spacing.unit*0.5,
    marginRight: theme.spacing.unit*0.5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    //width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  affected: {
    flip: false,
    textAlign: "right",
    style: "float: right;"
  },
  input:{
    backgroundColor:'#ffffff',
    
 } 
});

function DatePickers(props) {
  const { classes, loading, rangePickerProps, buttonProps, disableButton } = props;

  const { defaultValue, onChangeStart, onChangeEnd } = rangePickerProps;

  const [init, end] = defaultValue;
  const startDate = moment(init).format("YYYY-MM-DD");
  const endDate = moment(end).format("YYYY-MM-DD");

  return (
    <div style={{width:'70%', marginTop:15}}>

    
    <form  noValidate>
      <TextField
        id="startDate"
        label="Desde"
        type="date"
        disabled={loading}
        defaultValue={startDate}
        onChange={onChangeStart}
        className={classes.textField}
        margin="dense"
        variant="outlined"
        InputProps={{
        classes: {
            input: classes.input
        }
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="endDate"
        label="Hasta"
        type="date"
        disabled={loading}
        defaultValue={endDate}
        onChange={onChangeEnd}
        className={classes.textField}
        margin="dense"
        variant="outlined"
        InputProps={{
        classes: {
            input: classes.input
        }
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      { !disableButton &&
        <Button
        disabled={loading}
        {...buttonProps}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Buscar
      </Button>
      }
    </form>
    </div>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
