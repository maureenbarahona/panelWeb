/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-24T16:33:35-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-24T16:44:36-06:00
 */
export default [
  {
    path: '/login',
    component: '../layout/UserLayout',
    routes: [
      { path: '/login', component: './User/Login' },
    ]
  },
  {
    path: '/',
    component: '../layout/MainLayout',
    routes: [
      { path: '/transactions', component: './pages/Transactions' },
      { path: '/liquidations', component: './pages/Liquidations' },
    ]
  }
];
