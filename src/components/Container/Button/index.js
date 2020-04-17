/**
 * @Author: maureen
 * @Date:   2019-02-26T09:57:13-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-03-02T09:32:56-06:00
 */
import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const CreateButton = props => {
  const { classes, onClick, label } = props;
  return (
    <div>
      <Button onClick={onClick} variant="contained" className={classes.button}>
        {label}
      </Button>
    </div>
  );
};

export default withStyles(styles)(CreateButton);
