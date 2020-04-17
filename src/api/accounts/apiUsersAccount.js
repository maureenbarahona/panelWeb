import axios from 'axios';
import { authHeader } from '../../services/user';
import {  baseURL } from '../../services/request';


const getAllUserAccounts = async ( ) => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
    try {
      const { data } = await axios.get(`${baseURL}/userAccount`, axiosConfig);
       
      const dataSource = data.map(userAccount => {
        return {
          _id : userAccount._id,
          account: userAccount.account,
          email: userAccount.email,
          password: userAccount.password,
          createdAt: userAccount.createdAt,
          status: userAccount.isActive,
          role: userAccount.role,
          name: userAccount.name,
          workPhone: userAccount.workPhone
        };
      });
      return dataSource;
    } catch (error) {      
      if (error) {
        const message = error.message;
        throw new Error({ message });
      }
    }
  };

  const sendUserAccounts = async (axiosBody) => {
    const axiosConfig = {
      headers: {
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      const response = await axios.post(
        `${baseURL}/userAccount`,
        axiosBody,
        axiosConfig
      );
      return  { ...response } ;    
  
    } catch (error) {
      if (error) {
        const err = {...error};
       throw new Error( err.response.data.message );
        
      }
    }
  };
  

  export { getAllUserAccounts,sendUserAccounts };