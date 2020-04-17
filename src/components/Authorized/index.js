/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-23T09:40:26-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-24T08:56:41-06:00
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

//import auth from '../../utils/auth';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const Authorized = ({ component: Component, ...rest }) => {
  <Route
   {...rest}
   render={props =>
     fakeAuth.isAuthenticated ? (
       <Component {...props} />
     ) : (
       <Redirect
         to={{
           pathname: "/login",
           state: { from: props.location }
         }}
       />
     )
   }
 />
}

export default Authorized
