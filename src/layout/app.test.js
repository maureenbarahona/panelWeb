/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-17T11:13:29-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-17T11:13:35-06:00
 */
 import React from 'react';
 import ReactDOM from 'react-dom';
 import App from './App';

 it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
   ReactDOM.unmountComponentAtNode(div);
 });
