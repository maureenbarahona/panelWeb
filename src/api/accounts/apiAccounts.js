import axios from 'axios';
import { authHeader } from '../../services/user';
import { baseURL } from '../../services/request';


const updateAccounts = async (axiosBody, id) => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const response = await axios.put(
      `${baseURL}/accounts/${id}`,
      axiosBody,
      axiosConfig
    );
    return { response };
  } catch (error) {
    const err = {...error};
       throw new Error( err.response.data.message );
  }
};

const sendInfoAccounts = async axiosBody => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const response = await axios.post(
      `${baseURL}/accounts`,
      axiosBody,
      axiosConfig
    );
    const { data } = response;
    return { ...data };
  } catch (error) {
    const err = {...error};
    throw new Error( err.response.data.message );
  }
};

const getOneAccounts = async id => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const { data } = await axios.get(`${baseURL}/accounts/${id}`, axiosConfig);
    return { ...data };
  } catch (error) {
    const err = {...error};
    throw new Error( err.response.data.message );
  }
};

const getAccountsWithFilter = async filter => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const { data } = await axios.get(
      `${baseURL}/accounts?accountName=${filter}`,
      axiosConfig
    );

    const dataSource = data.map(account => {
      return {
        accountName: account.displayName,
        email: account.email,
        phoneNumber: account.phoneNumber,
        commercialName: account.commercialName,
        createdAt: account.createdAt,
        status: account.isActive
      };
    });
    return dataSource;
  } catch (error) {
    const err = {...error};
    throw new Error( err.response.data.message );
  }
};

const getAllAccounts = async () => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
 
  try {
    const { data } = await axios.get(`${baseURL}/accounts`, axiosConfig);

    const dataSource = data.map(account => {
      return {
        _id: account._id,
        accountName: account.displayName,
        email: account.email,
        phoneNumber: account.phoneNumber,
        commercialName: account.commercialName,
        createdAt: account.createdAt,
        status: account.isActive
      };
    });
    return dataSource;
  } catch (error) {
    const err = {...error};
       throw new Error( err.response.data.message );
  }
};

export {
  getAllAccounts,
  getAccountsWithFilter,
  sendInfoAccounts,
  getOneAccounts,
  updateAccounts
};
