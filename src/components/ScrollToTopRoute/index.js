/**
 * @Author: Fredi Lopez
 * @Date:   2019-02-28T12:22:23-06:00
 * @Last modified by:   Fredi Lopez
 * @Last modified time: 2019-02-28T12:22:23-06:00
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class ScrollToTopRoute extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
  componentDidMount(){
        window.scrollTo(0, 0)
  }
  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => (<Component {...props} />)} />;
  }
}

export default ScrollToTopRoute;