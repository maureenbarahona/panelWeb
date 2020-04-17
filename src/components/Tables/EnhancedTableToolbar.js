/**
 * @Author: maureen
 * @Date:   2019-02-21T08:31:38-06:00
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-21T10:06:26-06:00
 */
 import React from 'react';
 import classNames from 'classnames';
 import PropTypes from 'prop-types';
 import { withStyles } from '@material-ui/core/styles';

 import Toolbar from '@material-ui/core/Toolbar';

 import IconButton from '@material-ui/core/IconButton';
 import Tooltip from '@material-ui/core/Tooltip';
 import FilterListIcon from '@material-ui/icons/FilterList';
 import { lighten } from '@material-ui/core/styles/colorManipulator';


 const toolbarStyles = theme => ({
     root: {
         paddingRight: theme.spacing.unit,
     },
     highlight:
         theme.palette.type === 'light'
             ? {
                 color: theme.palette.secondary.main,
                 backgroundColor: lighten(theme.palette.secondary.light, 0.85),
             }
             : {
                 color: theme.palette.text.primary,
                 backgroundColor: theme.palette.secondary.dark,
             },
     spacer: {
         flex: '1 1 100%',
     },
     actions: {
         color: theme.palette.text.secondary,
     },
     title: {
         flex: '0 0 auto',
     },
 });

 let EnhancedTableToolbar = props => {
     const { numSelected, classes } = props;

     return (
         <Toolbar
             className={classNames(classes.root, {
                 [classes.highlight]: numSelected > 0,
             })}
         >
             <div className={classes.title}>

             </div>
             <div className={classes.spacer} />
             <div className={classes.actions}>

                 <Tooltip title="Filter list">
                     <IconButton aria-label="Filter list">
                         <FilterListIcon />
                     </IconButton>
                 </Tooltip>
             </div>
         </Toolbar>
     );
 };

 EnhancedTableToolbar.propTypes = {
     classes: PropTypes.object.isRequired,
     numSelected: PropTypes.number.isRequired,
 };

 EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

 export default EnhancedTableToolbar;
