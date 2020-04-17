import axios from 'axios';
import { authHeader } from '../../services/user';
import { baseURL } from '../../services/request';

const postLogin = async (email, password) => {
    const axiosConfig = {
        headers: {
          ...authHeader()
        },
        responseType: 'json'
      };
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {email, password}, axiosConfig);
    return { response };
  } catch (error) {
    const err = {...error};
       throw new Error( err.response.data.message );
  }
};

export {
    postLogin
};
