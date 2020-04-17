/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-26T15:03:35-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-28T22:04:31-06:00
 */
import axios from 'axios';
import isNil from 'lodash/isNil';
import { notification } from 'antd';
import { headers, baseURL } from './request';


let isAuthenticated = sessionStorage.getItem('user');

const authHeader =() =>{
  let user = JSON.parse(sessionStorage.getItem('user'));

  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token, 'Content-Type': 'application/json' };
  } else {
    return {};
  }
};

const userInfo = () => {
  let user = JSON.parse(sessionStorage.getItem('user'));

  return user;
}
const login = async (email, password, remindMe) => {
  try {
    const configs = {
      headers,
      responseType: 'json',
    }
    const { data } = await axios.post(`${baseURL}/login`, { email, password }, configs );
    const { _id, name, role, token } = data;
    if (!isNil(token)) {

      isAuthenticated = true;
      //if (remindMe) {
        sessionStorage.setItem('user', JSON.stringify({ _id, name, role, token }));
      //}
      //sessionStorage.setItem('user', JSON.stringify({ token, name, _id }));
    }

    return { token, name, _id } ;

  } catch (error) {

      const {response} = error;
      let message = 'Error de conexion';
      if (response) {
          const {data} = response;
          message = data.message;
      }

    notification.error({
      message: 'Error',
      description: message,
    });

  }
}
const logout = () => {
    sessionStorage.removeItem('user');

    window.location.reload()
}

export {
  login,
  logout,
  userInfo,
  authHeader,
  isAuthenticated
}
