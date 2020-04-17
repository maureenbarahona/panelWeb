
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 535
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 5
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

function SearchBar(props) {
  const { classes, placeholder, onChange } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Paper>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
