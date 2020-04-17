
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/BreadCrumbs';
import Typography from '@material-ui/core/Typography';


let currentPath = '';

const classes = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2)
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

export default class Iconbreadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHome: false,
      goToCrumb: false,
      newPath: ''
    };
  }
  componentDidMmount() {
    alert(window.location.pathname);
  }

  onOpenHome = e => {
    e.preventDefault();
    this.setState({ openHome: true });
  };

  onBreadcrumbs = e => {
    e.preventDefault();
    const newCrumb = e.target.id;
    const indexPath = currentPath.indexOf(newCrumb);
    const newPath = currentPath.slice(0, indexPath + newCrumb.length);
    this.setState({ goToCrumb: true, newPath });
  };

  renderCrumb() {
    if (!this.state.goToCrumb) {
      return <div></div>;
    } else this.setState({ goToCrumb: false });
    let path = this.state.newPath;

    return (
      <div>
        <Redirect
          push
          to={{
            pathname: path
          }}
        />
      </div>
    );
  }

  render() {
    currentPath = window.location.pathname;

    let arrayPath = currentPath.split('/');
    arrayPath.shift();

    return (
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={0} className={classes.root}>
          <Breadcrumbs aria-label='Breadcrumb'>
            <HomeIcon style={{ margin: '0 0 -5px 0', position: 'relative' }} />
            {arrayPath.map(crumb => {
                return (
                <Typography
                  className={classes.title2}
                  color='textPrimary'
                  guttertop
                  id={crumb}
                >
                  {crumb}
                </Typography>
                
                );
            })}

            {this.renderCrumb()}
          </Breadcrumbs>
        </Paper>
      </div>
    );
  }
}
