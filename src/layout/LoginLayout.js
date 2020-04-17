/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:11:02-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   maureen
 * @Last modified time: 2019-02-19T21:59:47-06:00
 */
import React from 'react';
import { Route } from 'react-router-dom';

const LoginLayout = ({children, ...rest}) => {
  return (
    <div>{children}</div>
  )
}

const LoginLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <LoginLayout>
          <Component {...matchProps} />
      </LoginLayout>
    )} />
  )
};

export default LoginLayoutRoute;
