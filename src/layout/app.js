/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:11:02-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:
 * @Last modified time: 2018-12-12T12:13:43-06:00
 */
import React from 'react';
import {BrowserRouter , Route, Switch, Redirect} from "react-router-dom";

import MainLayout from './MainLayout/MainLayout';


import Login from './../pages/Login/Login';
import Register from './../pages/Register';
import PrivateRoute from './../pages/PrivateRoute';


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
             <Redirect to="/panel/dashboard" />
            </Route>
            <Route path="/login" component={Login}/>
            <Route path="/signUp" component={Register}/>
            <PrivateRoute path="/panel" component={MainLayout}/>
        </Switch>

    </BrowserRouter>
);

export default App;
