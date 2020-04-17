/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-24T10:06:56-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-27T19:46:56-06:00
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    sessionStorage.getItem('user')
    ? (<Component {...props} />)
    : (<Redirect to={{pathname: '/login', state: { from: props.location }}}/>)
  )} />
);

export default PrivateRoute;
