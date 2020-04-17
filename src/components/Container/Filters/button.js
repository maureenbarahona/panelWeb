/**
 * @Author: maureen
 * @Date:   2019-02-26T09:57:13-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-03-01T09:26:05-06:00
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
    marginBottom: "20px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});
function CreateButton(props) {
  const { classes, onClick, label } = props;
  return (
    <form className={classes.container} noValidate>
      <Button
        onClick={onClick}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {label}
      </Button>
    </form>
  );
}

CreateButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateButton);
