import React, { Component } from 'react';

import ApiKeys from './../../pages/ApiKeys';
import Accounts from '../../pages/AdminUsers/Accounts/dashboard';
import Transactions from './../../pages/Transactions';
import PrivateRoute from './../../pages/PrivateRoute';
import Liquidations from './../../pages/Liquidations';
import SubscriberId  from './../../pages/AdminUsers/Subscribers/subscriberId';
import AccountsDetails from './../../pages/AdminUsers/Accounts/AccountDetail/index.js';
import AccountProfile from './../../pages/AdminUsers/Accounts/AccountProfile/AccountProfile.js';

import LiquidationsDetail from './../../pages/LiquidationDetails';


//Menu lateral
import AdminDashboard from './../../pages/AdminUsers/Dashboard';
import AdminCustomers from './../../pages/AdminUsers/Customers';
import AdminProducts from './../../pages/AdminUsers/Products';
import ProductDetail from './../../pages/AdminUsers/Products/productDetail.js';
import CustomersClients from './../../pages/AdminUsers/Customers/CustomersClients.js';
import AdminSubscribers from './../../pages/AdminUsers/Subscribers';
import SubscriberDetail from './../../pages/AdminUsers/Subscribers/subscriberDetail.js';
import PaymentHistory from "./../../pages/AdminUsers/PaymentHistory/paymentHistory.js";
import BillingHistory from "./../../pages/AdminUsers/BillingHistory/billingHistory.js";
import Billing from './../../pages/AdminUsers/Billing/billing.js';
import BillingConfirmation from './../../pages/AdminUsers/BillingConfirmation/billingConfirmation.js';

const userInfo = () => {
  let user = JSON.parse(sessionStorage.getItem('user'));

  return user;
};
class Container extends Component {
  render() {
    const userLogged = userInfo();
    if (userLogged.role === 'SUPER_USSER') {
      return (
        <div>
          <PrivateRoute
            exact
            path='/panel/dashboard'
            component={Transactions}
          />
          <PrivateRoute
            exact
            path='/panel/liquidations'
            component={Liquidations}
          />
          <PrivateRoute
            exact
            path='/panel/liquidations/:id'
            component={LiquidationsDetail}
          />
           <PrivateRoute
            exact
            path='/panel/AccountDetail/:id'
            component={AccountsDetails}
          />
          <PrivateRoute exact path='/panel/apiKeys' component={ApiKeys} />
        </div>
      );
    } else {
      return (
        /////******Rutas de ADMIN_USER */
        <div>
             <PrivateRoute
            exact
            path='/panel/dashboard'
            component={AdminDashboard}
          />
          <PrivateRoute
            exact
            path='/panel/customersDashboard'
            component={AdminCustomers}
          />
          <PrivateRoute
            exact
            path="/panel/PaymentHistory"
            component={PaymentHistory}
          />
          <PrivateRoute
            exact
            path="/panel/BillingHistory"
            component={BillingHistory}
          />
          <PrivateRoute
            exact
            path="/panel/Billing"
            component={Billing}
          />
          <PrivateRoute
            exact
            path="/panel/BillingConfirmation/:id"
            component={BillingConfirmation}
          />
          <PrivateRoute
            exact
            path='/panel/productsDashboard'
            component={AdminProducts}
          />
          <PrivateRoute
            exact
            path='/panel/productDetail/:id'
            component={ProductDetail}
          />
          <PrivateRoute
            exact
            path='/panel/customers/:id'
            component={CustomersClients}
          />

           <PrivateRoute
            exact
            path='/panel/subscribers'
            component={AdminSubscribers}
          />
          <PrivateRoute
            exact
            path='/panel/SubscriberDetail'
            component={SubscriberDetail}
          />
           <PrivateRoute
            exact
            path='/panel/Subscriber/:id'
            component={SubscriberId}
          />
          <PrivateRoute
            exact
            path='/panel/liquidations/:id'
            component={LiquidationsDetail}
          />
          <PrivateRoute exact path='/panel/accounts' component={Accounts} />
          <PrivateRoute
            exact
            path='/panel/AccountDetail/:id'
            component={AccountsDetails}
          />
          <PrivateRoute exact path='/panel/apiKeys' component={ApiKeys} />
          <PrivateRoute
            exact
            path="/panel/AccountProfile"
            component={AccountProfile}
          />
        </div>
      );
    }
  }
}

export default Container;
