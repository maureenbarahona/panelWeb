/**
 * @Author: maureen
 * @Date:   2019-02-19T11:24:08-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-21T07:44:25-06:00
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import { withStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';


 const styles = theme => ({
   button: {
     margin: theme.spacing.unit,
   },
   input: {
     display: 'none',
   },
 });

 function ContainedButtons(props) {
   const { classes } = props;
   return (
     <div>
       <Button variant="contained" className={classes.button}>
         + NUEVO CLIENTE
       </Button>
       <Button variant="contained" color="primary" className={classes.button}>
         + NUEVO CLIENTE
       </Button>
       <Button variant="contained" color="secondary" className={classes.button}>
         Secondary
       </Button>
       <Button variant="contained" color="secondary" disabled className={classes.button}>
         Disabled
       </Button>
       <Button variant="contained" href="#contained-buttons" className={classes.button}>
         Link
       </Button>
       <input
         accept="image/*"
         className={classes.input}
         id="contained-button-file"
         multiple
         type="file"
       />
       <label htmlFor="contained-button-file">
         <Button variant="contained" component="span" className={classes.button}>
           Upload
         </Button>
       </label>
     </div>
   );
 }

 ContainedButtons.propTypes = {
   classes: PropTypes.object.isRequired,
 };

 export default withStyles(styles)(ContainedButtons);
