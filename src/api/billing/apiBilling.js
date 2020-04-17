import axios from 'axios';
import { authHeader } from '../../services/user';
import { baseURL, headers } from '../../services/request';


const getOneBilling = async (id) => {

    const axiosConfig = {
      headers: {
        ...headers,
        ...authHeader()
      },
      responseType: 'json'
    };

    try {
      let { data } = await axios.get(
        `${baseURL}/orderPayment/${id}`,
        axiosConfig
      );

      return data;

    } catch (error) {
      const err = {...error};
      throw new Error( err.response.data.message );
    }
  };


export {
  getOneBilling
};
