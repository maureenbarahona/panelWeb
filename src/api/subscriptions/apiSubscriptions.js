import axios from 'axios';
import { authHeader } from '../../services/user';
import { baseURL } from '../../services/request';


const updateSubscriptions = async (axiosBody, id) => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const response = await axios.put(
      `${baseURL}/subscriptions/${id}`,
      axiosBody,
      axiosConfig
    );
    return { response };
  } catch (error) {
    const err = {...error};
       throw new Error( err.response.data.message );
  }
};

const sendSubscriptions = async axiosBody => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const response = await axios.post(
      `${baseURL}/subscriptions`,
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

const getOnesubscriptions = async id => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
  try {
    const { data } = await axios.get(`${baseURL}/subscriptions/${id}`, axiosConfig);
    return { ...data };
  } catch (error) {
    const err = {...error};
    throw new Error( err.response.data.message );
  }
};

const deleteSubscriptions = async axiosBody => {
    const axiosConfig = {
      headers: {
        ...authHeader()
      },
      responseType: 'json'
    };
    try {
      const response = await axios.delete(
        `${baseURL}/subscriptions`,
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


const getAllSubscriptions = async () => {
  const axiosConfig = {
    headers: {
      ...authHeader()
    },
    responseType: 'json'
  };
 
  try {
    const response = await axios.get(
        `${baseURL}/subscriptions`,
        axiosConfig
      );
      const { data } = response;
      return { ...data };
  } catch (error) {
    const err = {...error};
       throw new Error( err.response.data.message );
  }
};

export {
  sendSubscriptions,
  getAllSubscriptions,
  deleteSubscriptions,  
  getOnesubscriptions,
  updateSubscriptions
};
