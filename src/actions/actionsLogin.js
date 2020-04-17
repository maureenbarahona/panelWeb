import { postLogin
  } from '../api/login/apiLogin';
  
  const getLogin = async (email, password) => {
    try {
      return postLogin(email, password);
    } catch (error) {
      throw new Error(error);
    }
  }; 
  
  export {
    getLogin
  };
  